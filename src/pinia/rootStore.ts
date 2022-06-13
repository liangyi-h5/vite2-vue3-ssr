import { Pinia } from './types'

export const SymbolPinia = Symbol()


// 记录 Pinia并可以获取
export let activePinia: Pinia | undefined
export const setActivePinia = (pinia: Pinia | undefined) => (activePinia = pinia)

export type _Method = (...args: any[]) => any