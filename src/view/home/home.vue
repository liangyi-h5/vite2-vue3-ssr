<template>
  <div class='home'>
    <router-link to='/about'>about</router-link><br/>
    <router-link to='/json-to-excel'>json to excel</router-link>
  </div>
</template>

<script setup lang='ts'>
import { useTest } from '../../hook/useTest'
useTest()
</script>

<style scoped>
</style>
