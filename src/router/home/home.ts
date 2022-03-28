// import Home from '../../view/home/index.vue'
const Home = () => import('../../view/home/index.vue')


export default [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]