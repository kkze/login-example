import { type } from 'vue-router';
<script lang="ts" setup>
import TaskCard from "./components/TaskCard.vue"

</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header" type="large">
        <el-icon class="icon" size="32"><List /></el-icon>
        <h2>日志管理系统</h2>
      </el-header>
      <el-main>
        <!-- <el-empty description="欢迎来到首页" /> -->
        <TaskCard/>
      </el-main>
    </el-container>
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
  border-bottom: 1px gray solid;

  color:black;
  h2{
    margin-left: 10px;
  }
}

</style>
