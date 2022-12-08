import { Pinia } from './types'
/**
 * @description 唯一
 */
export const SymbolPinia = Symbol('mini-pinia')

// 记录 Pinia并可以获取
export let activePinia: Pinia | undefined
export const setActivePinia = (pinia: Pinia | undefined) => (activePinia = pinia)

export type _Method = (...args: any[]) => any
