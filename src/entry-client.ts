import { createApp } from './main'

const { app, router, pinia } = createApp()

if (window.__INITIAL_STATE__) {
  // 客户端获取服务端state
  pinia.state.value = window.__INITIAL_STATE__
}

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app')
})