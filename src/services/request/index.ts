import axios, { AxiosInstance } from 'axios'
import type { XJRequestConfig, XJRequestInterceptors } from './types'
import { getErrMessage } from './errorCode'
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true

class XJRequest {
  instance: AxiosInstance
  interceptors?: XJRequestInterceptors
  showLoading: boolean
  loading?: any
  constructor(config: XJRequestConfig) {
    //XJRequestConfig继承自AxiosRequestConfig并进行了拦截器接口扩展
    this.instance = axios.create(config) //根据传入配置手动创建实例
    this.interceptors = config.interceptors //添加拦截器
    this.showLoading = config.showLoading ?? DEFAULT_LOADING //控制loading显示
    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor, //请求成功拦截
      this.interceptors?.requestInterceptorCatch //请求失败拦截
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor, //响应成功拦截
      this.interceptors?.responseInterceptorCatch //响应失败拦截
    )

    //全局请求拦截器
    this.instance.interceptors.request.use(
      (res) => {
        console.log('全局拦截请求成功')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载中...'
          })
        }
        return res
      },
      (err) => {
        return err
      }
    )
    //全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局拦截响应成功')
        //移除Loading
        setTimeout(() => {
          this.loading?.close()
        }, 2000)
        return res.data
      },
      (err) => {
        //移除Loading
        this.loading?.close()
        //错误状态码解析信息
        err = getErrMessage(err)
        return err
      }
    )
  }

  request<T>(config: XJRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        //判断单独请求是否存在请求成功拦截 是则执行其拦截并返回请求接口的配置信息
        // 返回 config/res 的目的是拦截器中可能会对其改变所以需要拿到最新的结果返回过来
        config = config.interceptors.requestInterceptor(config)

        //判断单独请求是否需要显示loading 与配置不一致时才修改
        if (config.showLoading === !this.showLoading) {
          this.showLoading = config.showLoading
        }
      }

      //这里以及上面的request传入泛型T的目的是返回的结果的类型可以由发送时定义
      //这时默认下面的responseInterceptor(res)中的res是AxiosResponse
      //但是我们想用我们发送定义的接口类型这时候就需要传入泛型来解决
      this.instance.request<any, T>(config).then(
        (res) => {
          if (config.interceptors?.responseInterceptor) {
            //判断单独请求是否存在响应成功拦截 是则执行其拦截并返回响应成功的数据
            res = config.interceptors.responseInterceptor(res)
            //无论响应是否成功失败都需要初始化showliadong的值以便响应下次请求的配置
            this.showLoading = DEFAULT_LOADING
          }
          resolve(res)
        },
        (err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        }
      )
    })
  }
  get<T>(config: XJRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: XJRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
}


export default XJRequest
