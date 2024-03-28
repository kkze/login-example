import type { UserData } from "@/types"
import { request } from "@/utils/service"
/** 登录并返回 Token */
export function loginApi(data: UserData) {
    return request<LoginResponseData>({
      url: "login",
      method: "post",
      data
    })
  }
export type LoginResponseData = ApiResponseData<{ token: string }>