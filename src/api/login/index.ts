import type { LoginRequestData } from "@/types"
import { request } from "@/utils/service"
/** 登录并返回 Token */
export function loginApi(data: LoginRequestData) {
    return request<LoginResponseData>({
      url: "login",
      method: "post",
      data
    })
  }
export type LoginResponseData = { token: string }