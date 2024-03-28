<template>
    <el-container style="height: 100vh;">
      <el-header>
        <el-button @click="toggleSideBar" icon="el-icon-menu" circle></el-button>
        这里是头部区域
      </el-header>
  
      <el-container>
        <transition name="slide">
          <el-aside v-show="isSidebarOpen" :style="{ width: asideWidth }">
            <el-menu :default-openeds="['1']">
              <el-menu-item index="1">
                <router-link to="/dashboard">任务列表</router-link>
              </el-menu-item>
              <el-menu-item index="2">
                <router-link to="/logs_table">日志表</router-link>
              </el-menu-item>
            </el-menu>
          </el-aside>
        </transition>
  
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isSidebarOpen = ref(window.innerWidth > 768);
const asideWidth = '200px';

const updateSidebarVisibility = () => {
  isSidebarOpen.value = window.innerWidth > 768;
};

onMounted(() => {
  window.addEventListener('resize', updateSidebarVisibility);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateSidebarVisibility);
});

function toggleSideBar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<style scoped>
/* 过渡效果 */
.slide-enter-active, .slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
  