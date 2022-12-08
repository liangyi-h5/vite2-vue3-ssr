import { useIndexStore } from '@/store'
import { request as clientRequest } from './client-request'
import { request as serverRequest } from './server-request'
import { AxiosRequestConfig } from 'axios'

async function request<Response>(config: AxiosRequestConfig){
  try {
    const store = useIndexStore()
    const axiosInstance = import.meta.env.SSR ? serverRequest(store) : clientRequest(store)
    return await axiosInstance<AxiosRequestConfig, Response>(config)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getAccessInfo = (params?: Record<string, any>) => {
  interface AccessInfoRespponse{
    visits: number
    numberOfVisits: number
  }
  return request<AccessInfoRespponse>({
    url: '/get/access_info',
    method: 'get',
    params
  })
}