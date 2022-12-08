/* eslint-disable no-setter-return */
/* eslint-disable @typescript-eslint/ban-types */
import {
  getCurrentInstance,
  inject,
  EffectScope,
  effectScope,
  reactive,
  watch,
  isRef,
  toRefs,
  computed,
  onUnmounted
} from 'vue'
import { setActivePinia, SymbolPinia, activePinia, _Method } from './rootStore'
import { Pinia, StoreDefinition } from './types'
console.log(setActivePinia, activePinia)
export function addSubscription<T extends _Method> (subscriptions: T[], callback: T) {
  subscriptions.push(callback)
  function reomveSubscription () {
    const idx = subscriptions.indexOf(callback)
    if (idx !== -1) {
      subscriptions.splice(idx, 1)
    }
  }
  onUnmounted(reomveSubscription)
  return reomveSubscription
}

export function triggerSubscriptions<T extends _Method> (subscriptions: T[], ...args: Parameters<T>) {
  // eslint-disable-next-line n/no-callback-literal
  subscriptions.forEach(callback => callback(...args))
}

// 用于： defineStore('data', { msg: 'state数据' })
export function defineStore (idOrOptions: any, setup: any): StoreDefinition<any, any, any> {
  let id: string
  let options: Record<string, any>

  // 两种形式配置项
  if (typeof idOrOptions === 'string') {
    id = idOrOptions
    options = setup
  } else {
    options = idOrOptions
    id = idOrOptions.id
  }
  // 如果是函数 说明是一个setup语法
  const isSetupStore = typeof setup === 'function'

  function useStore (): any {
    // 拿到app实例
    const currentInstance = getCurrentInstance()
    // 拿到 main.js 内  app.use( createPinia() ) 时 setActivePinia 的 pinia
    // inject(SymbolPinia) 拿到挂载在app上的 miniPinia
    const pinia: Pinia | any = (currentInstance != null) && inject(SymbolPinia)
    // if (pinia) {
    //   // 如果有pinia 刷新存储的pinia
    //   setActivePinia(pinia)
    // }
    // pinia = activePinia

    // 没有该 store 就创建：两种模式 Setup ｜ Options
    if (pinia) {
      if (!pinia._s.has(id)) {
        // 如果还没有注册对应id模块，去注册
        if (isSetupStore) {
          createSetupStore(id, setup, pinia)
        } else {
          createOptionsStore(id, options, pinia)
        }
      }

      // 存储的Map取值
      const store = pinia._s.get(id)
      return store
    }
  }

  return useStore
}

function createSetupStore (id: any, setup: Function, pinia: Pinia): any {
  // 副作用
  let scope: EffectScope
  // 副作用函数执行
  const setupStore = pinia._e.run(() => {
    scope = effectScope()
    return scope.run(() => setup())
  })

  function wrapAction (name: any, action: any) {
    return function () {
      // debugger
      // 触发action的时候 可以触发一些额外的逻辑
      const afterCallbackList: any[] = []
      const onErrorCallbackList: any[] = []
      function after (callback: Function) {
        afterCallbackList.push(callback)
      }
      function onError (callback: Function) {
        onErrorCallbackList.push(callback)
      }

      // 触发 action 给你传递两个参数
      triggerSubscriptions(actionSubscribes, { after, onError, store, name })

      let ret
      try {
        ret = action.apply(store, arguments)
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error)
      }
      if (ret instanceof Promise) {
        return ret
          .then(value => {
            triggerSubscriptions(afterCallbackList, value)
          })
          .catch(async error => {
            triggerSubscriptions(onErrorCallbackList, error)
            return await Promise.reject(error)
          })
      } else {
        triggerSubscriptions(afterCallbackList, ret)
      }

      return ret
    }
  }

  for (const key in setupStore) {
    const prop = setupStore[key]
    if (typeof prop === 'function') {
      setupStore[key] = wrapAction(key, prop)
    }
  }

  // 实现 $patch API (作用：批量改变状态)： https://pinia.vuejs.org/api/interfaces/pinia._StoreWithState.html#patch
  function $patch (partialStateOrMutation: any) {
    if (typeof partialStateOrMutation === 'function') {
      partialStateOrMutation(store)
    } else {
      mergeReactiveObject(store, partialStateOrMutation)
    }
  }

  // 当用户状态变化的时候 可以监控到变化 并且通知用户 发布订阅
  let actionSubscribes: any[] = []
  const partialStore = {
    $patch,
    // 实现 $subscribe API (订阅状态改变) https://pinia.vuejs.org/api/interfaces/pinia._StoreWithState.html#subscribe
    $subscribe (callback: Function, options: Object) {
      scope.run(() =>
        watch(
          pinia.state.value[id],
          state => {
            // 监控状态变化
            // eslint-disable-next-line n/no-callback-literal
            callback({ type: 'dirct' }, state)
          },
          options
        )
      )
    },
    $onAction: addSubscription.bind(null, actionSubscribes),
    // 实现 $dispose API (清除当前store状态，变成单纯的无状态store对象) https://pinia.vuejs.org/api/interfaces/pinia._StoreWithState.html#dispose
    $dispose: () => {
      scope.stop()
      actionSubscribes = []
      pinia._s.delete(id) // 删除store, 数据变化了不会在更新视图
    }
  }
  // 每一个store都是一个响应式对象
  const store = reactive(partialStore)
  Object.defineProperty(store, '$state', {
    get: () => pinia.state.value[id],
    set: state => $patch(($state: any) => Object.assign($state, state))
  })

  // 最终会将处理好的setupStore 放到store的身上
  Object.assign(store, setupStore) // reactive 中放ref 会被拆包  store.count.value

  // 每次 defineStore('xxx', { data: '共享数据' }) 注册状态都会遍历执行所有插件， 添加插件： const pinia = createPinia(); pinia.use(fn)
  pinia._p.forEach(plugin => Object.assign(store, plugin({ store, pinia, app: pinia._a!, id })))

  pinia._s.set(id, store)
  return store
}
function createOptionsStore (id: any, options: any, pinia: Pinia) {
  const { state, getters, actions } = options

  // setup 作用： 让 state, getters, actions 响应式，并且合并到一个对象里返回
  function setup () {
    // ref放入的是对象 会被自动proxy
    pinia.state.value[id] = state ? state() : {}
    const localState = toRefs(pinia.state.value[id])
    return Object.assign(
      localState,
      actions,
      Object.keys(getters || {}).reduce((computedGetters: any, name) => {
        // 计算属性有缓存的性质
        computedGetters[name] = computed(() => {
          // 我们需要获取当前的store是谁
          return getters[name].call(store, store)
        })
        return computedGetters
      }, {})
    )
  }

  const store = createSetupStore(id, setup, pinia)

  // 实现 $reset API (作用：恢复到初始状态)：https://pinia.vuejs.org/api/interfaces/pinia._StoreWithState.html#reset
  store.$reset = function () {
    const newState = state ? state() : {}
    store.$patch(($state: any) => {
      Object.assign($state, newState)
    })
  }
  return store
}

// 递归 $patch
function mergeReactiveObject (target: any, partialState: any) {
  for (const key in partialState) {
    // 如果是原型上的不考虑
    if (!Object.prototype.hasOwnProperty.call(partialState, key)) {
      continue
    }

    const oldValue = target[key]
    const newValue = partialState[key]

    // 状态有可能是ref, ref也是一个对象不能递归
    if (isObject(oldValue) && isObject(newValue) && isRef(newValue)) {
      target[key] = mergeReactiveObject(oldValue, newValue)
    } else {
      target[key] = newValue
    }
  }

  return target
}

const isObject = (value: any) => {
  return typeof value === 'object' && value !== null
}
