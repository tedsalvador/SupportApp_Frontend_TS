// src/store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    userRole: '',
  },
  mutations: {
    setUserRole(state, role) {
      state.userRole = role;
    },
  },
});

export default store;
