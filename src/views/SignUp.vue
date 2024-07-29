<!-- src/views/SignUp.vue -->
<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
      <div>
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" v-model="firstName" placeholder="First Name" required />
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model="lastName" placeholder="Last Name" required />
      </div>
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" placeholder="Username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Password" required />
      </div>
      <button type="submit">Sign Up</button>
      <p v-if="error" style="color:red">{{ error }}</p>
      <p v-if="success" style="color:green">{{ success }}</p>
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
//const error = ref(null);
const error = ref('');
const success = ref('');

async function signUp() {
  try {
    const response = await axios.post('http://localhost:8080/api/users/signup', {
     // const response = await axios.post('http://localhost:8080/api/users', {
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
/*       user_password: password.value,
      user_role: 'USER', */
      userPassword: password.value,
      userRole: 'USER' // Asigna un rol predeterminado, si es necesario      
    });
    if (response.status === 201) {
      alert('User registered successfully!');
      error.value = '';
      router.push('/login');
    } else {
      alert('Sign up failed');
    }
  } catch (error) {
/*     console.error(error);
    alert('Sign up failed'); */
    if (err.response && err.response.data && err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = 'An error occurred. Please try again later.';
    }
    success.value = '';
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