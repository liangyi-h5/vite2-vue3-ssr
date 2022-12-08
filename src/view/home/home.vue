<template>
  <div class="home">
    <img
      :src="getAssetsHomeFile('logo.png')"
      alt="3221qwrqw34"
    ><br>
    <img
      :src="img"
      alt="3221qwrqw34"
    ><br>
    <router-link to="/about">
      about
    </router-link><br>
    <router-link to="/json-to-excel">
      json to excel
    </router-link>
    <HelloWorld msg="hello" />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
/* 两种加载图片方式 */
import { getAssetsHomeFile } from '@/utils/getAssetsHomeFile'
import img from '@/assets/image/logo.png'
import { useAccessInfoStore } from '@/store/accessInfo'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
  components: {
    HelloWorld
  },
  async setup () {
    const store = useAccessInfoStore()
    if (!import.meta.env.SSR) {
      // 客户端
      if (!store.hasData) {
        // 没有在服务端请求数据
        await store.getPageData()
      }
    }
    return {
      img,
      getAssetsHomeFile
    }
  },
  /**
   * @desc 提供服务端请求接口数据函数，页面级路由
   * @TODO 未尝试嵌套路由模式
   */
  async asyncData () {
    const store = useAccessInfoStore()
    return await store.getPageData()
  }
})
</script>

<style scoped>
.home{
  background: url('@/assets/image/122.webp') no-repeat left top/100%;
}
</style>
