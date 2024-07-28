<!-- src/views/Login.vue -->
<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
    <div v-if="error">
      <p>{{ error }}</p>
  </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '../stores/userStore';

const router = useRouter();
const userStore = useUserStore();

const username = ref('');
const password = ref('');

async function login() {
  try {
    const response = await axios.post('http://localhost:8080/api/users/login', { username: username.value, userPassword: password.value });
    const user = response.data;
    if (user) {
      userStore.setUserRole(user.userRole);
      alert("Valor de role= " + user.userRole);
      router.push(user.userRole === 'ADMIN' ? '/adminuser' : '/supportrequest');
    } else {
      alert('Invalid username or password');
    }
  } /* catch (error) {
    console.error(error);
    alert('Login failed');
  } */
  catch (err) {
    if (err.response && err.response.status === 401) {
      error.value = 'Invalid username or password';
    } else {
      error.value = 'An error occurred. Please try again later.';
    }
  }
}
</script>

<style>
.login {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login h1 {
  margin-bottom: 20px;
}

.login div {
  margin-bottom: 10px;
}

.login label {
  display: block;
  margin-bottom: 5px;
}

.login input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.login button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login p {
  text-align: center;
}
</style>
