import axois, { AxiosRequestConfig, AxiosResponse} from 'axios'
import { getToken, removeToken } from './auth'

export interface ResponseData {
  statusCode: number
  message?: string
  data?: any
}

const axiosInstance = axois.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true
})

// 错误处理
const errorHander = (statusCode: number, error: any, message?: string): void => {
  let msg: string
  switch(statusCode) {
    case 400:
      msg = '客服端请求语法错误，服务器无法理解'
      break
    case 401:
      msg = '登录信息过期，请重新登录'
      break
    case 403:
      msg = '暂无权限'
      break
    case 404:
      msg = `请求地址出错:${error.esponse.config.url}`
      break
    case 405:
      msg = '请求方式被禁止'
      break
    case 408:
      msg = '请求超时'
      break
    case 500:
      msg = '服务器内部错误'
      break
    case 501:
      msg = '服务器内部错误'
      break
    case 502:
      msg = '服务器内部错误'
      break
    case 503:
      msg = '服务器内部错误'
      break
    case 504:
      msg = '服务器内部错误'
      break
    case 505:
      msg = '服务器不支持当前请求的HTTP协议的版本'
      break
    default:
      msg = `请求出错:${error.message}`
  }
  msg = message || msg
}

axiosInstance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  if(!!getToken('tokenKey')) {
    config.headers = {
      token: getToken('tokenKey')
    } 
  }
  return config
})

axiosInstance.interceptors.response.use((_response: AxiosResponse) => {
  const { data: response } = _response
  const { statusCode, message, data } = response
  if ( statusCode === 200) {
    return Promise.resolve(data)
  } else {
    errorHander(statusCode, response, message)
    return Promise.reject(response)
  }
}, error => {
  if(error && error.response) {
    const { status } = error.response
    errorHander(status, error)
  }
  return Promise.reject(error)
})

export default axiosInstance
