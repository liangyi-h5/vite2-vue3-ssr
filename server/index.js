const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const { createBundleRenderer } = require('./renderer')
const hostApiRouter = require('./services/index')
const bodyParser = require('body-parser');
const initMiddleware = require('./middlewares/initMiddleware');

const PORT = process.env.PORT || 3000
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD
const isProd = process.env.NODE_ENV === 'production'

async function createServer(
  root = process.cwd(),
) {
  const app = express()

  app.use(bodyParser.json()); // 处理 json 格式
  app.use(bodyParser.urlencoded({ extended: false })); // 处理 urlencoded 格式
  app.use(initMiddleware)
  app.use('/api', hostApiRouter)
  const apiProxyBaseUrl = process.env.VITE_APP_API_BASE_URL
  // 代理域名
  apiProxyBaseUrl && app.use('/api', createProxyMiddleware({
    target: apiProxyBaseUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }))

  return await createBundleRenderer(app, root, isTest)
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(PORT, () => {
      console.log(`\x1b[42;30m服务启动成功:\x1b[0;32m \x1b[4m${'http'}://localhost:${PORT}\x1b[0m`)
      if (!isProd) {
        const getIPAdress = () => {
          let interfaces = require('os').networkInterfaces();
          for (var devName in interfaces) {
            var iface = interfaces[devName];
            if (iface) {
              for (var i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                  return alias.address
                }
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
