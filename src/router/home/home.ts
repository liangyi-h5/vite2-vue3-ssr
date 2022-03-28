// import Home from '../../view/home/index.vue'
const Home = () => import(/* webpackChunkName: "home" */ '../../view/home/index.vue')


export default [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]