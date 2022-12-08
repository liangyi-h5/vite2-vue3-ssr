// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')
import AppCom from './App.vue'
import { createSSRApp, App } from 'vue'
import { Router } from 'vue-router'
import { createRouter } from './router'
import { createPinia, Pinia } from 'pinia'
import { createMiniPinia } from './pinia'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp (): {
  app: App<Element>
  router: Router
  minipinia: any
  pinia: Pinia
} {
  const app = createSSRApp(AppCom)
  const router = createRouter()
  router.beforeEach((to, from) => {
    console.log(to.meta.metaInfo)
    if (!import.meta.env.SSR) {
      const metaInfo = (to.meta.metaInfo as {
        title?: string
      })
      let title = '没有配置title'
      if (metaInfo.title && metaInfo.title.length > 0) {
        title = metaInfo.title
      }
      document.title = title
    }
  })
  app.use(router)
  const pinia = createPinia()
  const minipinia = createMiniPinia()
  app.use(pinia)
  app.use(minipinia)
  return { app, router, minipinia, pinia }
}
