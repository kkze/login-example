import { request } from "@/utils/service";
import { type TasksRequestData } from "@/types";

/** 登录并返回 Token */
export function createTaskApi(data: TasksRequestData) {
    return request<TasksResponseData>({
        url: "/tasks",
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

export type TasksResponseData = { message: string };
