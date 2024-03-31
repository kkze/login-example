import type { LoginRequestData } from "@/types";
import { request } from "@/utils/service";

/** 登录并返回 Token */
export function loginApi(data: LoginRequestData) {
    return request<LoginResponseData>({
        url: "auth/login",
        method: "post",
        data,
    });
}

export function registerApi(data: LoginRequestData) {
    return request<LoginResponseData>({
        url: "auth/register",
        method: "post",
        data,
    });
}

/** 登出操作 */
export function logoutApi() {
    return request({
        url: "auth/logout",
        method: "get",
    });
}

export type LoginResponseData = { token: string };
