<template>
  <div class='home'>
    <img :src="getAssetsHomeFile('logo.png')" alt="3221qwrqw34"/><br/>
    <img :src="img" alt="3221qwrqw34"/><br/>
    <router-link to='/about'>about</router-link><br/>
    <router-link to='/json-to-excel'>json to excel</router-link>
  </div>
</template>

<script setup lang='ts'>
import { useTest } from '@/hook/useTest'
/* 两种加载图片方式 */
import { getAssetsHomeFile } from '@/utils/getAssetsHomeFile'
import img from '@/assets/image/logo.png'

useTest()
</script>

<style scoped>
.home{
  background: url('@/assets/image/122.webp') no-repeat left top/100%;
}
</style>
