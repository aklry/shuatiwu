import type { AxiosRequestConfig, AxiosResponse } from 'axios'

//针对AxiosRequestConfig配置进行扩展
export interface RYInterceptor<T = AxiosResponse> {
    requestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestFail?: (error: never) => never
    responseSuccess?: (res: T) => T
    responseFail?: (error: never) => never
}

export interface RYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: RYInterceptor<T>
}
