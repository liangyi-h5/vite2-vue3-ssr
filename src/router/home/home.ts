// import Home from '../../view/home/index.vue'
const Home = () => import('../../view/home/home.vue')
const JsonToExcel = () => import('../../view/jsonToExcel/jsonToExcel.vue')
const MiniPinia = () => import('../../view/miniPinia/index.vue')


export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      metaInfo: {
        title: '首页',
        meta: `<meta property="首页 seo内容" content="内容">`
      }
    },
    // beforeEnter: (to:any, from:any) => {
    //   if (!import.meta.env.SSR) {
    //     document.title = '首页'
    //   }
    //   // reject the navigation
    //   // return false
    // }
  },
  {
    path: '/json-to-excel',
    name: 'json-to-excel',
    component: JsonToExcel,
    meta: {
      metaInfo: {
        title: 'json转excel',
        meta: `<meta property="json-to-excel seo内容" content="内容">`
      }
    },
    // beforeEnter: (to:any, from:any) => {
    //   if (!import.meta.env.SSR) {
    //     document.title = 'json转excel'
    //   }
    //   // reject the navigation
    //   // return false
    // }
  },
  {
    path: '/mini-pinia',
    name: 'mini-pinia',
    component: MiniPinia,
    meta: {
      metaInfo: {
        title: 'mini-pinia',
        meta: `<meta property="mini-pinia seo内容" content="内容">`
      }
    },
  }
]