// src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userRole: '',
    username: '',
    idUser: '',
  }),
  actions: {
    setUserRole(role) {
      this.userRole = role;
    },
    //adicional
    setUsername(username) {
      this.username = username;
    },
    getIdUser(idUser) {
      this.idUser = idUser;
    },
    //adicional
  },
});
