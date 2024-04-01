// store/modules/user.ts
import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { getTasks } from "@/api/task";
import { ref } from "vue";
import type { TasksData } from "@/types";

export const useTaskStore = defineStore("task", () => {
     const tasks = ref<TasksData[]>([{
            execute_type: "immediate",
            id: 0,
            name: '',
            last_run: '',
            next_run: '',
            schedule: '',
            start_time: '',
            status: "stopped",
            task_type: 'single',

        }]);
    const updateTasksList = async() => {
        try {
            tasks.value = await getTasks();
            ElMessage.success("获取任务列表成功");
            return tasks;
        } catch (error) {
            ElMessage.error("获取任务列表失败");
            throw error;
        }
    }


    return { updateTasksList,tasks};
});
