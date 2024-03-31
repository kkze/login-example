// store/modules/user.ts
import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { getTasks } from "@/api/task";

export const useTaskStore = defineStore("task", () => {

    const tasksList = async() => {
        try {
            const data = await getTasks();
            ElMessage.success("获取任务列表成功");
            return data;
        } catch (error) {
            ElMessage.error("获取任务列表失败");
            throw error;
        }
    }


    return { tasksList,};
});
