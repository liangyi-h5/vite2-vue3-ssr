// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')
import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { createPinia } from 'pinia'
import { createMiniPinia } from './pinia'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  router.beforeEach((to, from) => {
    if (!import.meta.env.SSR) {
      const metaInfo:any = to.meta.metaInfo || {}
      document.title = metaInfo.title ? metaInfo.title : '没有配置title' 
    }
  })
  app.use(router)
  const pinia = createPinia()
  const minipinia = createMiniPinia()
  app.use(pinia)
  app.use(minipinia)
  return { app, router, minipinia, pinia }
}

