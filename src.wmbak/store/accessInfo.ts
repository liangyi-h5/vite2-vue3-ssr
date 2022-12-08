import { getAccessInfo } from '@/api'
import { defineStore } from 'pinia'

export const useAccessInfoStore = defineStore('accessInfo', {
  state: () => {
    return {
      visits: 0,
      numberOfVisits: 0,
      hasData: false
    }
  },
  actions: {
    setData(state: {
      visits: number
      numberOfVisits: number
    }) {
      this.visits = state.visits
      this.numberOfVisits = state.numberOfVisits
      this.hasData = true
    },
    async getPageData () {
      try {
        const res = await getAccessInfo()
        this.setData(res)
        return res
      } catch (err) {
        console.log(err)
        return Promise.resolve(err)
      }
    }
    // getPageData () {
    //   try {
    //     this.setData({
    //       visits: 2,
    //       numberOfVisits: 1
    //     })
    //   } catch (err) {
    //     console.log(err)
    //     return Promise.reject(err)
    //   }
    // }
  },
})
