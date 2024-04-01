<script setup lang="ts">
import { inject, reactive, ref, onMounted, type Ref } from 'vue';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import type { TasksData, TasksRequestData } from '@/types';
import { createTaskApi, editTaskApi } from '@/api/task';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useTaskStore } from '@/store/modules/task';
dayjs.extend(isSameOrAfter);

let taskInfo: TasksRequestData = reactive({
    name: '备份日志',
    task_type: 'single',
    start_time: '',
    schedule: '',
    execute_type: 'immediate',
});
const detailID = inject('detailID') as Ref<number>; //TODO 解决类型问题
const isEdit = ref(false)
//TODO 编辑功能
onMounted(() => {
    if (detailID) {
        const newTaskInfo = {...taskInfo}

        taskInfo = useTaskStore().tasks.find(i => {
            i.id === detailID?.value
            return i
        }
        ) as TasksRequestData
        // newTaskInfo
        console.log('taskInfo', taskInfo);
        isEdit.value = true
    }
})
const editTask = async(detailData: TasksData) => {
    try {
        const data = await editTaskApi(detailData);
        ElMessage.success(data.message);
        useTaskStore().updateTasksList()
    } catch (error: any) {
        ElMessage.error(error.message);
        throw error;
    }
}

const defaultTime = new Date()

const createTask = async(taskInfo: TasksRequestData) => {
    try {
        const data = await createTaskApi(taskInfo);
        ElMessage.success(data.message);
        useTaskStore().updateTasksList()
    } catch (error: any) {
        ElMessage.error(error.message);
        throw error;
    }
}
const onSubmit = () => {
    if (isEdit.value && detailID.value) {
        editTask(taskInfo as TasksData)
        return
    }

    console.log('dayjs', dayjs().isSameOrAfter(dayjs(taskInfo.start_time)));
    if (taskInfo.start_time && dayjs().isSameOrAfter(dayjs(taskInfo.start_time))) {
        console.log();
        ElMessage.error("请选择未来的时间")
        return
    }
    createTask(taskInfo);
};
</script>


<template>
    <div class="cron-generator">
        <el-card class="box-card">
            <div class="clearfix">
                <span>任务设置</span>
            </div>
            <el-form :model="taskInfo" label-width="120px">
                <el-form-item label="名称">
                    <el-input v-model="taskInfo.name" :placeholder="'备份日志'" />
                </el-form-item>
                <el-form-item label="任务类型">
                    <el-radio-group v-model="taskInfo.task_type">
                        <el-radio :value="'single'">单次任务</el-radio>
                        <el-radio :value="'repeat'">重复任务</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-radio-group v-model="taskInfo.execute_type">
                        <el-radio :value="'immediate'">立即执行</el-radio>
                        <el-radio :value="'scheduled'">定时任务</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="执行时间" v-if="taskInfo.execute_type === 'scheduled'">
                    <el-date-picker v-model="taskInfo.start_time" placeholder="选择日期和时间" type="datetime"
                        :default-time="defaultTime" />
                </el-form-item>

                <el-form-item label="重复频率" v-if="taskInfo.task_type === 'repeat'">
                    <el-select v-model="taskInfo.schedule" placeholder="请选择频率">
                        <el-option label="每分钟" value="minutely"></el-option>
                        <el-option label="每小时" value="hourly"></el-option>
                        <el-option label="每天" value="daily"></el-option>
                        <el-option label="每周" value="weekly"></el-option>
                        <el-option label="每月" value="monthly"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="onSubmit">提交任务</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>


<style scoped>
.cron-generator {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.box-card {
    width: 500px;
}
</style>