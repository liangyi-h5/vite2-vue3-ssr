const vuePlugin = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const virtualFile = '@virtual-file'
const virtualId = '\0' + virtualFile
const nestedVirtualFile = '@nested-virtual-file'
const nestedVirtualId = '\0' + nestedVirtualFile
const { visualizer } = require('rollup-plugin-visualizer')
const path = require('path')

const outputDir = path.join(process.cwd(), './dist')
const isProd = process.env.NODE_ENV === 'production'


const isClient = process.env.TARGET_ENV === 'client'
const timestamp = Date.now() / 1000

const buildOutput = () => {
  if (isClient && isProd) {
    // 客户端代码拆分
    return {
      manualChunks(id) {
        if (id.includes('xlsx')) {
          // 拆分 xlsx
          return 'xlsx'
        }
        if (id.includes('node_modules')) {
          if (id.includes('vue-router')) {
            // 拆分vue-router
            return 'router'
          }
          if (id.includes('vue')) {
            // 拆分vue
            return 'vue'
          }
          return 'vendor'
        }
      }
    }
  } else {
    // 服务端代码打包
    return {
      entryFileNames: `assets/[name].js`,
      chunkFileNames: `assets/[name].js`,
      assetFileNames: `assets/[name].[ext]`
    }
  }
}
const createVisualizer = () => {
  return isProd ? visualizer({
    filename: './dist/visualizer.html', // 文件名 stats.html
    gzipSize: true, // 是否收集gzip打包后的大小
    open: false, // 是否打开分析文件
    // projectRoot: outputDir
  }) : null
}
/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  plugins: [
    vuePlugin(),
    vueJsx(),
    {
      name: 'virtual',
      resolveId(id) {
        if (id === '@foo') {
          return id
        }
      },
      load(id) {
        if (id === '@foo') {
          return `export default { msg: 'hi' }`
        }
      }
    },
    {
      name: 'virtual-module',
      resolveId(id) {
        if (id === virtualFile) {
          return virtualId
        } else if (id === nestedVirtualFile) {
          return nestedVirtualId
        }
      },
      load(id) {
        if (id === virtualId) {
          return `export { msg } from "@nested-virtual-file";`
        } else if (id === nestedVirtualId) {
          return `export const msg = "[success] from conventional virtual file"`
        }
      }
    },
    createVisualizer()
  ],
  build: {
    minify: !isProd,
    rollupOptions: {
      output: buildOutput()
    }
  }
}
