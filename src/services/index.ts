import XJRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import { getToken } from '../utils/auth'


const xjRequest = new XJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: false, //默认接口没有Loading动画效果
  interceptors: {
    //请求成功的拦截
    requestInterceptor: (config) => {
      //携带token拦截
      console.log('默认配置的请求成功拦截')
      const token = getToken('token') ?? ''
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    //请求失败的拦截
    requestInterceptorCatch: (err) => {
      return err
    },
    //响应成功的拦截
    responseInterceptor: (res) => {
      console.log('默认配置的相应成功拦截')
      return res
    },
    //响应失败的拦截
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default xjRequest
