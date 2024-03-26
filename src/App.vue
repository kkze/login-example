<script setup lang="ts">
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const onSubmit = (values: { username: string; password: string }) => {
  console.log('submit', values)
}
</script>

<template>
  <div class="flex w-full justify-center pt-20">
    <van-form
      @submit="onSubmit"
      class="w-96 h-80 flex bg-cyan-100 shadow-md rounded-md border-2 border-dark-400 boderw p-10 items-center flex-col"
    >
      <div class="mb-10">欢迎</div>
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div class="w-96 m-10">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>
