import { getCookie } from '@/utils'
import axios from 'axios'
import qs from 'qs'

export const request = (store: any) => {
  // store // 可以传入 pinia 的数据进来
  const req = axios.create({
    baseURL: '/api', // 客户端请求需要跨域代理，设置代理路径前缀，将在node代理 /api前缀路径
    headers: {
      accept: '*/*',
      'content-type': 'application/x-www-form-urlencoded'
    },
    timeout: 59000,
    withCredentials: false
  })

  // 请求拦截
  req.interceptors.request.use(config => {
    if (config.headers != null) {
      const uuId = getCookie('unique_session_id')
      console.log(uuId, ' req')
      if (uuId) {
        config.headers.unique_session_id = uuId
      }
    }
    // console.log(config, 'config')
    const reqMethod = config.method?.toLocaleLowerCase()
    if (reqMethod === 'post' || reqMethod === 'put' || reqMethod === 'delete') {
      if (Object.prototype.toString.call(config.data) !== '[object FormData]') {
        config.data = qs.stringify(config.data)
      }
    }
    return config
  })

  // 响应拦截
  req.interceptors.response.use(response => {
    let data
    if (response.data === undefined) {
      data = JSON.parse(response.request.responseText)
    } else {
      data = response.data
    }
    const resError = new Error(data.msg || data.message)
    // resError.code = parseInt(data.code || data.status)

    switch (data.code || data.status) {
      case 200:
        return data.data || data.content
      default:
        console.log('interceptors.response default', data, response)
        return Promise.reject(resError)
    }
  }, async error => {
    const errCode = error.response
    const errStatus = error.status as number
    if (errCode) {
      switch (error.response.status) {
        case 400:
          error.message = 'Bad Request'
          break
        case 403:
          error.message = 'Forbidden'
          break
        case 404:
          error.message = 'Not Found'
          break
        case 500:
          error.message = 'Internal Server Error'
          break
        default:
          error.message = `Connection error ${errStatus}`
      }
    } else {
      if (error.message.indexOf('timeout') !== -1) {
        error = { status: 503, message: 'The network connection is temporarily unavailable. Please refresh the page and try again.', time_out: true }
      } else if (error.message.indexOf('canceled') !== -1) {
        error.status = 400
      }
    }
    return await Promise.reject(error)
  })
  return req
}
