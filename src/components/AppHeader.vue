<template>
  <Suspense>
    <p>访问人次： {{ store.visits }}</p>
  </Suspense>
  <Suspense>
    <p>访问人数： {{ store.numberOfVisits }}</p>
  </Suspense>
</template>
<script setup lang="ts">
import { useAccessInfoStore } from '@/store/accessInfo'

const store = useAccessInfoStore()
</script>
