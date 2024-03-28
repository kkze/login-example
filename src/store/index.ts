
import type { UserData } from '@/types';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(userData:UserData) {
      this.user = userData;
    },
  },
});