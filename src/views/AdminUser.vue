<!-- src/views/AdminUser.vue -->
<template>
    <div class="admin-user">
      <h1>Manage Users</h1>
      <form @submit.prevent="createUser">
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
        <div>
          <label for="userRole">User Role</label>
          <input type="text" id="userRole" v-model="userRole" required />
        </div>
        <button type="submit">Create User</button>
      </form>
      <h2>All Users</h2>
      <ul>
        <!-- <li v-for="user in users" :key="user.id_user"> -->
        <li v-for="user in users" :key="user.idUser">
          {{ user.idUser }} - {{ user.firstName }} - {{ user.lastName }} - {{ user.username }} - {{ user.userRole }}
          <button @click="deleteUser(user.idUser)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const firstName = ref('');
  const lastName = ref('');
  const username = ref('');
  const password = ref('');
  const userRole = ref('');
  const users = ref([]);
  
  async function createUser() {
    try {
      const response = await axios.post('http://localhost:8080/api/users/signup', {
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        userPassword: password.value,
        userRole: userRole.value,
      });
      if (response.status === 201) {
        users.value.push(response.data);
        alert('User Created successfull !');
        firstName.value='',
        lastName.value='',
        username.value='',
        password.value='',
        userRole.value=''
        const refreshPage = () => {
          window.location.reload(); // Reloads the current page
        };
      }
    } catch (error) {
      console.error(error);
      alert('Failed to create user');
    }
  }
  
  async function fetchUsers() {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      users.value = response.data;
    } catch (error) {
      console.error(error);
      alert('Failed to fetch users');
    }
  }
  
  async function deleteUser(idUser) {
    try {
      const response = await axios.delete(`http://localhost:8080/api/users/${idUser}`);
      alert("status del api : " + response.status);
      if (response.status === 201) {
        users.value = users.value.filter(user => user.id_user !== idUser);
        alert('User Deleted successfull !');

          window.location.reload(); // Reloads the current page

      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete user');
    }
  }
  
  onMounted(() => {
    fetchUsers();
  });
  </script>
  
  <style>
  .admin-user {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .admin-user h1 {
    margin-bottom: 20px;
  }
  
  .admin-user form {
    margin-bottom: 20px;
  }
  
  .admin-user form div {
    margin-bottom: 10px;
  }
  
  .admin-user form label {
    display: block;
    margin-bottom: 5px;
  }
  
  .admin-user form input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .admin-user form button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .admin-user ul {
    list-style-type: none;
    padding: 0;
  }
  
  .admin-user ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  .admin-user ul li button {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>  