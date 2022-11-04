// @ts-check
const fs = require('fs')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

const resolve = (p) => path.resolve(__dirname, p)

/**
 * @type {import('vite').ViteDevServer}
 */
let vite
let createServerRes = {}

const manifest = isProd
? // @ts-ignore
  require('../dist/client/ssr-manifest.json')
: {}

const entryServer = isProd
  // @ts-ignore
  ? `../dist/server/${require('../dist/server/manifest.json')['src/entry-server.ts'].file}`
  : '/src/entry-server.ts'

const indexProd = isProd ? fs.readFileSync(resolve('../dist/client/index.html'), 'utf-8') : ''

const render = async (req, res) => {
  try {
    const url = req.originalUrl

    let template, render
    if (!isProd) {
      // always read fresh template in dev
      template = fs.readFileSync(resolve('../../index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule(entryServer)).render
    } else {
      template = indexProd
      // @ts-ignore
      render = require(entryServer).render
    }

    const [appHtml, preloadLinks, metaInfo, minipinia, pinia] = await render(url, manifest)

    const title = metaInfo.title || '未设置标题'
    const meta = metaInfo.meta || ''
    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--ssr-outlet-->`, appHtml)
      .replace(`<!--title-->`, title)
      .replace(`<!--meta-->`, meta)
      .replace(`<!--__INITIAL_STATE__-->`, `<script>window.__INITIAL_STATE__=${JSON.stringify(pinia.state.value)}</script>`)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    vite && vite.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
}

module.exports.createBundleRenderer = async (app, root, isTest) => {
   if (!isProd) {
     vite = await require('vite').createServer({
       root: root,
       logLevel: isTest ? 'error' : 'info',
       server: {
         middlewareMode: 'ssr',
         watch: {
           // During tests we edit the files too fast and sometimes chokidar
           // misses change events, so enforce polling for consistency
           usePolling: true,
           interval: 100
         }
       }
     })
     // 服务端获取vite 的env
     console.log(vite.config.env, 'vite env')
     // use vite's connect instance as middleware
     app.use(vite.middlewares)
     createServerRes.vite = vite
   } else {
     app.use(require('compression')())
     app.use(
       require('serve-static')(resolve('../dist/client'), {
         index: false
       })
     )
   }

   app.use('*', render)
   createServerRes.app = app
   return createServerRes
}
