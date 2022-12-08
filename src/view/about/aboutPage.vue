<template>
  <div class="home">
    {{ about }}
  </div>
</template>

<script setup lang='ts'>
import { useTest } from '../../hook/useTest'
useTest()
console.log('about')
const about = 'about'
</script>

<style scoped>

</style>
