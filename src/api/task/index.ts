import { request } from "@/utils/service";
import { type TasksData, type TasksRequestData } from "@/types";

/** 创建任务 */
export function createTaskApi(data: TasksRequestData) {
    return request<TasksResponseData>({
        url: "/tasks",
        method: "post",
        data,
    });
}

/** 获取任务列表 */
export function getTasksApi() {
    return request<TasksListData>({
        url: "/tasks/list",
        method: "get",
        data: {},
    });
}

/** 编辑任务 */
export function editTaskApi(data:TasksData) {
    console.log('`data.id:',`/tasks/${data.id}`,);
    return request<TasksResponseData>({
        url: `/tasks/${data.id}`,
        method: "PUT",
        data: data,
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
export type TasksListData = [TasksData];