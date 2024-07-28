<!-- src/views/SignUp.vue -->
<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
      <div>
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" v-model="firstName" required />
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model="lastName" required />
      </div>
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const username = ref('');
const password = ref('');

async function signUp() {
  try {
    const response = await axios.post('http://localhost:8080/api/signup', {
      first_name: firstName.value,
      last_name: lastName.value,
      username: username.value,
      user_password: password.value,
      user_role: 'USER',
    });
    if (response.status === 201) {
      alert('Sign up successful');
      router.push('/login');
    } else {
      alert('Sign up failed');
    }
  } catch (error) {
    console.error(error);
    alert('Sign up failed');
  }
}
</script>

<style>
.signup {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.signup h1 {
  margin-bottom: 20px;
}

.signup div {
  margin-bottom: 10px;
}

.signup label {
  display: block;
  margin-bottom: 5px;
}

.signup input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.signup button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.signup p {
  text-align: center;
}
</style>