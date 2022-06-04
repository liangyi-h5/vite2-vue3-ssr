// @ts-check
const fs = require('fs')
const path = require('path')
const express = require('express')

const PORT = process.env.PORT || 3000
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD
const isProd = process.env.NODE_ENV === 'production'

const entryServer = isProd
  // @ts-ignore
  ? `./dist/server/${require('./dist/server/manifest.json')['src/entry-server.ts'].file}`
  : '/src/entry-server.ts'

  async function createServer(
  root = process.cwd(),
) {
  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''

  const manifest = isProd
    ? // @ts-ignore
      require('./dist/client/ssr-manifest.json')
    : {}

  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await require('vite').createServer({
      root,
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
  } else {
    app.use(require('compression')())
    app.use(
      require('serve-static')(resolve('dist/client'), {
        index: false
      })
    )
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule(entryServer)).render
      } else {
        template = indexProd
        // @ts-ignore
        render = require(entryServer).render
      }

      const [appHtml, preloadLinks, metaInfo] = await render(url, manifest)

      const title = metaInfo.title || '未设置标题'
      const meta = metaInfo.meta || ''
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--title-->`, title)
        .replace(`<!--meta-->`, meta)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app, vite }
}
if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(PORT, () => {
      if (!isProd) {
        console.log(`\x1b[42;30m服务启动成功:\x1b[0;32m \x1b[4m${'http'}://localhost:${PORT}\x1b[0m`)
        const getIPAdress = () => {
          let interfaces = require('os').networkInterfaces();
          for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
              let alias = iface[i];
              if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
              }
            }
          }
        }
        console.log(`\x1b[42;30m服务启动成功:\x1b[0;32m \x1b[4mhttp://${getIPAdress()}:${PORT}\x1b[0m`)
        const domainName = process.env.DOMAIN_NAME
        domainName && console.log(`\x1b[42;30m服务启动成功:\x1b[0;32m \x1b[4m${domainName}:${PORT}\x1b[0m`)
      }
    })
  )
}
// for test use
exports.createServer = createServer
