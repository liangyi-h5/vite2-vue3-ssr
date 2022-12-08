// import About from '../../view/about/index.vue'
const About = () => import('../../view/about/about.vue')

export default [
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      metaInfo: {
        title: '关于我们',
        meta: `<meta property="关于我们 seo内容" content="内容">`
      }
    },
    // beforeEnter: (to:any, from:any) => {
    //   if (!import.meta.env.SSR) {
    //     document.title = '关于我们'
    //   }
    //   // reject the navigation
    //   // return false
    // }
  }
]