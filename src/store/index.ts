import { defineStore } from 'pinia'
import { defineStore as defineMiniStore } from '../pinia/store'

export const useIndexStore = defineStore('index', {
  state: () => {
    return {
      a: 'init state'
    }
  },
  actions: {
    increment(v:string) {
      this.a = v
    },
  },
})

const $ = (v:any) => {
  console.log($, 'currency')
  return `$${v}`
}
const r = (v:any) => {
  console.log($, 'currency')
  return `￥${v}`
}
export const useminiPiniaStore = defineMiniStore('index', {
  state: () => {
    return {
      a: '12',
      $t: $,
      currency: '$'
    }
  },
  getters: {
  },
  actions: {
    increment(v:string) {
      // this.a = v
      // this.$t = r
    },
  },
})
