import { createApp } from './main'

const { app, router, pinia } = createApp()

// console.log(JSON.stringify(window.__INITIAL_STATE__))
if (window.__INITIAL_STATE__) {
  // 客户端获取服务端state
  pinia.state.value = window.__INITIAL_STATE__
}

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app')
}).catch(err => {
  console.log('读取路由失败-> ', err)
})
