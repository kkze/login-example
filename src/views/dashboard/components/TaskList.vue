<template>
    <div class="app-container">
        <vxe-table border height="500" :row-config="{ isCurrent: true, isHover: true }" :column-config="{ resizable: true }"
            :data="tableData.tasks" 
            @cell-click="cellClickEvent"
            >
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="任务名称"></vxe-column>
            <vxe-column field="last_run" title="上次运行时间"></vxe-column>
            <vxe-column field="next_run" title="下次运行时间"></vxe-column>
            <vxe-column field="schedule" title="重复值" show-overflow></vxe-column>
            <vxe-column field="start_time" title="任务开始时间" show-overflow></vxe-column>
            <vxe-column field="status" title="执行状态" show-overflow></vxe-column>
            <vxe-column field="task_type" title="任务类别" show-overflow></vxe-column>
        </vxe-table>

        <vxe-modal v-model="showDetails" title="查看详情" width="600" height="400" :mask="false" :lock-view="false" resize>
            <template #default>
                <vxe-table border="inner" auto-resize show-overflow height="auto" :row-config="{ isHover: true }"
                    :show-header="false" :sync-resize="showDetails" :data="detailData">
                    <vxe-column field="label" width="40%"></vxe-column>
                    <vxe-column field="value"></vxe-column>
                </vxe-table>
                <TaskCard/>
            </template>
        </vxe-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { type TasksData } from '@/types';
import { useTaskStore } from "@/store/modules/task"
import TaskCard from "./TaskCard.vue"
import type { VxeTableEvents } from 'vxe-table';




const showDetails = ref(false)
const detailData = ref<{
    label: string
    value: string
}[]>([])

const tableData = useTaskStore()
onBeforeMount(async() => {
  await tableData.updateTasksList(); // 加载tasks数据
});


const cellClickEvent: VxeTableEvents.CellClick<TasksData> = ({ row }: { row: TasksData }) => {
    const fields: (keyof TasksData)[] = ['name', 'last_run', 'next_run', 'schedule', 'start_time', 'status','task_type'];
    detailData.value = fields.map(field => {
        return { label: field, value: row[field]?.toString() };
    });
    showDetails.value = true;
};

</script>