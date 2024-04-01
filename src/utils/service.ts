import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { get, merge } from "lodash-es"
import { getToken, removeToken } from "./cookies";
import router from "@/router";
import { ElMessage } from "element-plus";
/** 退出登录并强制刷新页面（会重定向到登录页） */
function logout() {
  removeToken()
  router.push("/login")
  }
function createService(){
    const service = axios.create()
    // 请求拦截
    service.interceptors.request.use(
        (config) => {
          return config},
        (error) => Promise.reject(error)
    )
    // 响应拦截
    service.interceptors.response.use(
        (response) => {
            const apiData = response.data
            return apiData
        },
        (error) => {
            // status 是 HTTP 状态码
            console.log("error",error);
            const status = get(error, "response.status")
            switch (status) {
              case 400:
                error.message = "请求错误"
                break
              case 401:
                // Token 过期时
                error.message = "登录失败"
                logout()
                break
              case 403:
                error.message = "拒绝访问"
                break
              case 404:
                error.message = "请求地址出错"
                break
              case 408:
                error.message = "请求超时"
                break
              case 500:
                error.message = "服务器内部错误"
                break
              case 501:
                error.message = "服务未实现"
                break
              case 502:
                error.message = "网关错误"
                break
              case 503:
                error.message = "服务不可用"
                break
              case 504:
                error.message = "网关超时"
                break
              case 505:
                error.message = "HTTP 版本不受支持"
                break
              default:
                break
            }
            ElMessage.error(error.response.data.msg)
            return Promise.reject(error)
          }
    )
    return service
}

/** 创建请求方法 */
function createRequest(service: AxiosInstance) {
    return function <T>(config: AxiosRequestConfig): Promise<T> {
      const token = getToken()
      const defaultConfig = {
        headers: {
          // 携带 Token
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json"
        },
        timeout: 5000,
        baseURL: import.meta.env.VITE_BASE_API,
        data: {}
      }
      // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
      const mergeConfig = merge(defaultConfig, config)
      return service(mergeConfig)
    }
  }
const service = createService()
/** 用于网络请求的方法 */
export const request = createRequest(service)