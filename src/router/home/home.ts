// import Home from '../../view/home/index.vue'
const Home = () => import('../../view/home/index.vue')
const JsonToExcel = () => import('../../view/jsonToExcel/index.vue')


export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/json-to-excel',
    name: 'json-to-excel',
    component: JsonToExcel
  }
]