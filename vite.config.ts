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

/**
 * @des 配置对应打包拆分输出名称
 */
const manualChunksConfig = [
  {
    regex: /^.*(node_modules).*(vue\/).*$/,
    // regex: /^.*(node_modules).*(?!\1)(?:vue\/|vue-router\/).*$/,
    name: 'vue'
  },
  {
    regex: /^.*(node_modules).*(vue-router\/).*$/,
    name: 'router'
  },
  {
    regex: /^.*(node_modules).*(xlsx\/).*$/,
    name: 'xlsx'
  }
]

const buildOutput = () => {
  if (isProd) {
    let config:any = {
      entryFileNames: `assets/js/[name].[hash].js`,
      chunkFileNames: `assets/js/[name].[hash].js`,
      assetFileNames: `assets/[ext]/[name].[hash].[ext]`
    }
    if (isClient) {
      config.manualChunks = (id) => {
        const [regex] = manualChunksConfig.filter(item => item.regex.test(id))
        if (regex) {
          return regex.name
        }
      }
    }
    return config
  } else {
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    minify: isProd,
    rollupOptions: {
      output: buildOutput()
    },
    assetsInlineLimit: 4096, // 默认4kb
    sourcemap: false, // map
    chunkSizeWarningLimit: 1500, // 最大文件警告
    manifest: !isClient, // 服务端打包一份 manifest.json 用来获取 entry.server.[hash].js  文件
  }
}
