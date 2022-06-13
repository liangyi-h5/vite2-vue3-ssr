<template>
  <div class="">
    mini + 
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MiniPiniaVue',
  created () {
    console.log(this.$store, 'created')
  },
  mounted() {
    console.log(this.$miniPinia.state, 'mounted')
  },
})
</script>