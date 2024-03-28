import { loginApi } from "@/api/login";
import type { LoginRequestData } from "@/types";
import { getToken, setToken } from "@/utils/cookies";
import { defineStore } from "pinia";
import { ref } from "vue";
import store from "@/store"

export const useUserStore = defineStore("user", ()=>{
    const token = ref<string>(getToken() || "")
    const login = async({ username, password }: LoginRequestData) => {
        const data = await loginApi({ username, password })
        setToken(data.token)
        token.value = data.token
        }
    return {login}
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
    return useUserStore(store)
}