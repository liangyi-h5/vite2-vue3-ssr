import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router'
import home from './home/home'
import about from './about/about'
// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
// const pages = import.meta.glob('./pages/*.vue')

// const routes = Object.keys(pages).map((path) => {
//   if (path) {
//     const RegExpMatchArray = path.match(/\.\/pages(.*)\.vue$/)
//     if (RegExpMatchArray && RegExpMatchArray?.length > 0) {
//       return {
//         path: RegExpMatchArray === '/home' ? '/' : name,
//         // component: pages[path] // () => import('./pages/*.vue')
//         component: pages[path] // () => import('./pages/*.vue')
//       }
//     }
//     a = [1].toLowerCase()

//   } else {
//     return {}
//   }
// })

const routes = [...home, ...about]
export function createRouter () {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
