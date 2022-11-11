// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs'
import path from 'node:path'

const toAbsolute = (p) => path.resolve(process.cwd(), p)

const manifest = JSON.parse(
  fs.readFileSync(toAbsolute('dist/static/ssr-manifest.json'), 'utf-8')
)

const routers = JSON.parse(
  fs.readFileSync(toAbsolute('./src/router/prerenderRouter.json'), 'utf-8')
)
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const serverManifest = JSON.parse(fs.readFileSync(toAbsolute('dist/server/manifest.json'), 'utf-8'))
const { render } = await import(`./dist/server/${serverManifest['src/entry-server.ts'].file}`)

;(async () => {
  // pre-render each route...
  for (const url of routers) {
    const [appHtml, preloadLinks, metaInfo, minipinia, pinia] = await render(url, manifest, {ip: ''}, true)
    const title = metaInfo.title || '未设置标题'
    const meta = metaInfo.meta || ''

    const html = template
    .replace(`<!--preload-links-->`, preloadLinks)
    .replace(`<!--ssr-outlet-->`, appHtml)
    .replace(`<!--title-->`, title)
    .replace(`<!--meta-->`, meta)
    .replace(`<!--__INITIAL_STATE__-->`, `<script>window.__INITIAL_STATE__=${JSON.stringify(pinia.state.value)}</script>`)

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
  }

  // done, delete ssr manifest
  fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))
})()