<template>
  <div class="home">
    <HelloWorld :msg="home"></HelloWorld>
  </div>
</template>

<script setup lang='ts'>
import HelloWorld from '../../components/HelloWorld.vue'
console.log('home')
const home = 'home'
</script>

<style scoped>

</style>