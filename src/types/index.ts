import type { CancelTokenStatic, Method } from "axios"

export interface SelfAxiosRequestConfig {
  url: string
  method: Method,
  noStop?:boolean,
  cancelToken: CancelTokenStatic,
  headers: {
    sptvstoken: string
  }
  data?: any
  params?: any
}
