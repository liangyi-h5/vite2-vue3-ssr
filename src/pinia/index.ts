import { markRaw, effectScope, Ref, ref } from 'vue'
import { SymbolPinia } from './rootStore'
import { StateTree, Pinia } from './types'

export const createMiniPinia  = () => {
   // true 范围不会被外部effectScope收集和停止
   const scope = effectScope(true)

   // run 方法的返回值就是这个fn的返回结果
   const state = scope.run<Ref<Record<string, StateTree>>>(() => ref<Record<string, StateTree>>({}))!
 
   const _p: Pinia['_p'] = []
  // 创建一个对象，使其用户不会成为代理
  const pinia = markRaw({
    install: (app:any) => {
      pinia._a = app
      app.provide(SymbolPinia, pinia)
      console.log('Create mini pinia')
      app.config.globalProperties.$miniPinia = pinia
    },
    _p, // 插件在状态改变便利调用 例如：本地存储插件
    _a: null,
    state, // 所有的状态
    _e: scope, // 用来管理这个应用的effectScope
    _s: new Map() // 记录所有的store
  })
  return pinia
}