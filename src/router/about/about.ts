// import About from '../../view/about/index.vue'
const About = () => import(/* webpackChunkName: "about" */ '../../view/about/index.vue')

export default [
  {
    path: '/about',
    name: 'about',
    component: About
  }
]