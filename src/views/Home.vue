<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <img src="@/assets/home-image.png" alt="Home Image" @click="goToLogin" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToLogin() {
  router.push('/login');
}
</script>

<style>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  cursor: pointer;
}

.home img {
  max-width: 100%;
  height: auto;
}
</style>
