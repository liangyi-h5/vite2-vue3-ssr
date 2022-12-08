
<template>
  <Header />
  <router-link to="/">
    home
  </router-link><br>
  <router-link to="/about">
    about
  </router-link><br>
  <button @click="go">
    weew
  </button>
  <br>
  <router-link to="/json-to-excel">
    json to excel
  </router-link>
  <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </router-view>
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useRouter, useRoute } from 'vue-router'
import { onMounted, watchEffect, useSSRContext } from 'vue'
import { useAccessInfoStore } from './store/accessInfo'
import Header from './components/AppHeader.vue'
import { generateUUID, getCookie, setCookie } from './utils'
import { setAccessInfo } from './api'

// console.log(import.meta.env.VITE_CONFIG_VALUE, 'VITE_CONFIG_VALUE')
const router = useRouter()
const go = () => {
  router.push('/about').then(() => {
    console.log('auccess')
  })
}
const route = useRoute()
// 服务端渲染的ssrcontent
const ssrContent = useSSRContext()
if (ssrContent) {
  ssrContent.template = 'template'
}
console.log(ssrContent, 'ssrContent')

const store = useAccessInfoStore()
watchEffect(() => {
  console.log(store.visits, 'watch')
})
onMounted(() => {
  let uuId = getCookie('unique_session_id')
  if (!uuId) {
    uuId = generateUUID()
    setCookie('unique_session_id', uuId, 35600)
  }
  console.log(uuId, 'uuId')
  setAccessInfo({ uuId })
  console.log(route, router)
})
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style lang="less">
body {
  #app{
  }
}
</style>
