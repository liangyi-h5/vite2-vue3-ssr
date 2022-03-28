

<template>
  <!-- <router-link to="/">Home</router-link>|
  <router-link to="/about">About</router-link>|
  <a href="javascript:void(0);" to="/about" @click="go('/about')">About</a>| -->
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
import { onMounted } from 'vue'
console.log(import.meta.env.VITE_CONFIG_VALUE, 'VITE_CONFIG_VALUE')
// const router = useRouter()
// const a = useRoute()
// onMounted(() => {
//   console.log('mounted')
// })
// const go = (path:string) => {
//   // debugger
//   router.push({
//     name: 'about'
//   })
// }
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
