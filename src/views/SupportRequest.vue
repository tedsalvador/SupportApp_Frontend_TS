<!-- src/views/SupportRequest.vue -->
<template>
    <div class="support-request">
      <h1>Support Request</h1>
      <form @submit.prevent="createSupportRequest">
        <div>
          <label for="description">Description</label>
          <input type="text" id="description" v-model="description" required />
        </div>
        <div>
          <label for="supportType">Support Type</label>
          <input type="text" id="supportType" v-model="supportType" required />
        </div>
        <button type="submit">Create Request</button>
      </form>
      <h2>Your Support Requests</h2>
      <ul>
        <li v-for="request in supportRequests" :key="request.id_support">
          {{ request.description }} - {{ request.status }}
          <button @click="cancelRequest(request.id_support)">Cancel</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useUserStore } from '../stores/userStore';
  
  const userStore = useUserStore();
  
  const description = ref('');
  const supportType = ref('');
  const supportRequests = ref([]);
  
  async function createSupportRequest() {
    try {
      const response = await axios.post('http://localhost:8080/api/support_requests', {
        description: description.value,
        support_type: supportType.value,
        id_user: userStore.user.id_user,
      });
      if (response.status === 201) {
        supportRequests.value.push(response.data);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to create support request');
    }
  }
  
  async function fetchSupportRequests() {
    try {
      const response = await axios.get(`http://localhost:8080/api/support_requests?username=${userStore.user.username}`);
      supportRequests.value = response.data;
    } catch (error) {
      console.error(error);
      alert('Failed to fetch support requests');
    }
  }
  
  async function cancelRequest(idSupport) {
    try {
      const response = await axios.put(`http://localhost:8080/api/support_requests/${idSupport}`, { status: 'Cancelled' });
      if (response.status === 200) {
        const request = supportRequests.value.find(r => r.id_support === idSupport);
        if (request) {
          request.status = 'Cancelled';
        }
      }
    } catch (error) {
      console.error(error);
      alert('Failed to cancel support request');
    }
  }
  
  onMounted(() => {
    fetchSupportRequests();
  });
  </script>
  
  <style>
  .support-request {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .support-request h1 {
    margin-bottom: 20px;
  }
  
  .support-request form {
    margin-bottom: 20px;
  }
  
  .support-request form div {
    margin-bottom: 10px;
  }
  
  .support-request form label {
    display: block;
    margin-bottom: 5px;
  }
  
  .support-request form input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .support-request form button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .support-request ul {
    list-style-type: none;
    padding: 0;
  }
  
  .support-request ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  .support-request ul li button {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>  