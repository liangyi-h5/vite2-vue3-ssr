<template>
  <div class='home'>
    <router-link to='/about'>about</router-link><br/>
    <router-link to='/json-to-excel'>json to excel</router-link><br/>
    <router-link to='/mini-pinia'>mini-pinia</router-link><br/>
  </div>
</template>

<script setup lang='ts'>
import { useTest } from '../../hook/useTest'
useTest()
</script>

<style scoped>
</style>
