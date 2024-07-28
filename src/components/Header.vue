<!-- src/components/Header.vue -->
<template>
  <header class="header">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link v-if="isUser" to="/supportrequest">Support Request</router-link>
      <router-link v-if="isAdmin" to="/adminuser">Admin User</router-link>
      <router-link v-if="isAdmin" to="/adminsupport">Admin Support</router-link>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const isUser = computed(() => userStore.userRole === 'USER');
const isAdmin = computed(() => userStore.userRole === 'ADMIN');
</script>

<style>
.header {
  background-color: #007bff;
  color: white;
  padding: 10px;
}

.header nav {
  display: flex;
  justify-content: space-around;
}

.header a {
  color: white;
  text-decoration: none;
}
</style>