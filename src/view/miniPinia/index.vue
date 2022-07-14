<template>
<div class="mini-pinia">
  <input type="text" v-model="text"><br/>
  <button @click="btn">btn</button><br/>
  <span>{{ministore.a}}</span><br/>
  <span>{{ministore.$t('213')}}</span><br/>
  <MiniPiniaVue></MiniPiniaVue>
</div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useIndexStore, useminiPiniaStore } from '../../store/index'
import MiniPiniaVue from '../../components/miniPinia/miniPinia.vue'
const ministore = useminiPiniaStore()
const text = ref('')
const store = useIndexStore()
const btn = () => {
  ministore.increment(234)
}
</script>