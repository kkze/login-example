import { type } from 'vue-router';
<script lang="ts" setup>
import TaskList from "./components/TaskList.vue"
import TaskCard from "./components/TaskCard.vue"
import {  ref } from 'vue'

const dialogFormVisible = ref(false)
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header  class="header " type="large">
        <el-icon class="icon" size="32"></el-icon>
        <h2>任务列表</h2>
        <el-button class="button" type="primary" plain @click="dialogFormVisible = true" >创建任务</el-button>
      </el-header>
      <el-main>
        <!-- <el-empty description="欢迎来到首页" /> -->
        <TaskList/>
      </el-main>
    </el-container>
    <el-dialog v-model="dialogFormVisible" width="500">
      <TaskCard/>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.common-layout{
  margin: 5px;
  box-shadow: 1px 1px 3px #999;
  border-radius: 10px;
}
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header{
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px gray solid;

  color:black;
  h2{
    margin-left: 10px;
  }
  .button{
    margin-right: 2rem;
  }
}

</style>
