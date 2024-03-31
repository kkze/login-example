// store/modules/user.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginApi, logoutApi } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/cookies";
import { ElMessage } from "element-plus";
import router from "@/router"; // 确保正确导入路由
import type { LoginRequestData } from "@/types";

export const useUserStore = defineStore("user", () => {
    const token = ref<string>(getToken() || "");

    const login = async({ username, password }: LoginRequestData) => {
        try {
            const data = await loginApi({ username, password });
            setToken(data.token);
            token.value = data.token;
            ElMessage.success("登录成功");
            router.push('/');
        } catch (error: any) {
            ElMessage.error(error.message);
            throw error;
        }
    };

    const logout = async() => {
        try {
            await logoutApi(); // 调用后端登出接口
            removeToken(); // 清除客户端存储的 Token
            token.value = ""; // 更新状态
            ElMessage.success("登出成功");
            router.push('/login'); // 重定向到登录页面
        } catch (error) {
            ElMessage.error("登出失败");
            throw error;
        }
    };

    return { token, login, logout };
});
