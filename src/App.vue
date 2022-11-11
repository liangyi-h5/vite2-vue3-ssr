

<template>
    <Header></Header>
    <router-link to='/'>home</router-link><br/>
    <router-link to='/about'>about</router-link><br/>
    <router-link to='/json-to-excel'>json to excel</router-link>
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
import { onMounted, watchEffect } from 'vue'
import { useAccessInfoStore } from './store/accessInfo'
import Header from './components/Header.vue';

// console.log(import.meta.env.VITE_CONFIG_VALUE, 'VITE_CONFIG_VALUE')
const router = useRouter()
const route = useRoute()

const store = useAccessInfoStore()
watchEffect(() => {
  console.log(store.visits, 'watch')
})
onMounted(() => {
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

