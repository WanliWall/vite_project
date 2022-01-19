import type { AxiosResponse, AxiosRequestConfig } from 'axios'

//定义拦截器接口类型
//这里的responseInterceptor类型用泛型的目的是可能后面我们会采用自己定义的接口类型
export interface XJRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

//扩展AxiosRequestConfig类型加上自己写的拦截器接口
export interface XJRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: XJRequestInterceptors<T>
  showLoading?: boolean
}
