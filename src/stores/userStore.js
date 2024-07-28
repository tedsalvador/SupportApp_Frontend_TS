// src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userRole: '',
  }),
  actions: {
    setUserRole(role) {
      this.userRole = role;
    },
  },
});
