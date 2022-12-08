import { App, Ref, EffectScope } from 'vue'

export type StateTree = Record<string | number | symbol, any>
export interface Pinia {
  install: (app: App) => void
  state: Ref<Record<string, StateTree>>
  use: (plugin: PiniaPlugin) => Pinia
  _p: PiniaPlugin[]
  _a: App | null
  _e: EffectScope
  _s: Map<string, any>
}

export type PiniaPlugin = (context: PiniaPluginContext) => any

export interface PiniaPluginContext {
  pinia: Pinia
  app: App
  store: any
  id: any
}

export type _GettersTree<S extends StateTree> = Record<
string,
| ((state: S) => any)
| (() => any)
>

export type _ActionsTree = Record<
string,
| (() => any)
>

export interface StoreDefinition<
Id extends string = string,
S extends StateTree = StateTree,
G /* extends GettersTree<S> */ = _GettersTree<S>,
A /* extends ActionsTree */ = _ActionsTree
> {
/**
 * Returns a store, creates it if necessary.
 *
 * @param pinia - Pinia instance to retrieve the store
 * @param hot - dev only hot module replacement
 */
  (pinia?: Pinia | null | undefined): any

  /**
 * Id of the store. Used by map helpers.
 */
  $id?: Id

  /**
 * Dev only pinia for HMR.
 *
 * @internal
 */
  _pinia?: Pinia

  action?: A

  getters?: G
}
