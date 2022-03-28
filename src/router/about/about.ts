// import About from '../../view/about/index.vue'
const About = () => import('../../view/about/index.vue')

export default [
  {
    path: '/about',
    name: 'about',
    component: About
  }
]