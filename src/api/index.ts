import { useIndexStore } from '@/store'
import { request as clientRequest } from './client-request'
import { request as serverRequest } from './server-request'
import { AxiosRequestConfig } from 'axios'

async function request<Response> (config: AxiosRequestConfig) {
  try {
    const store = useIndexStore()
    const axiosInstance = import.meta.env.SSR ? serverRequest(store) : clientRequest(store)
    return await axiosInstance<AxiosRequestConfig, Response>(config)
  } catch (err) {
    return await Promise.reject(err)
  }
}

export const getAccessInfo = async (params?: Record<string, any>) => {
  interface AccessInfoRespponse {
    visits: number
    numberOfVisits: number
  }
  return await request<AccessInfoRespponse>({
    url: '/get/access_info',
    method: 'get',
    params
  })
}

export const setAccessInfo = async (params?: { uuId: string }) => {
  return await request<null>({
    url: '/set/access_info',
    method: 'get',
    params
  })
}
