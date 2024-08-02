<!-- src/views/AdminSupport.vue -->
<template>
    <div class="admin-support">
      <h1>Manage Support Requests</h1>
      <h2>All Support Requests</h2>
      <ul>
        <li v-for="request in supportRequests" :key="request.idSupport">
          {{ request.idSupport }} - {{ request.dateRequest}} - {{ request.description }} - {{ request.supportType }} - {{ request.status }}
          <button @click="deleteRequest(request.idSupport)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const supportRequests = ref([]);
  
  async function fetchSupportRequests() {
    try {
      const response = await axios.get('http://localhost:8080/api/support_requests');
      supportRequests.value = response.data;
    } catch (error) {
      console.error(error);
      alert('Failed to fetch support requests');
    } 
  }
  
  async function deleteRequest(idSupport) {
    try {
      const response = await axios.delete(`http://localhost:8080/api/support_requests/${idSupport}`);
      if (response.status === 200) {
        supportRequests.value = supportRequests.value.filter(request => request.id_support !== idSupport);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete support request');
    }
  }
  
  onMounted(() => {
    fetchSupportRequests();
  });
  </script>
  
  <style>
  .admin-support {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .admin-support h1 {
    margin-bottom: 20px;
  }
  
  .admin-support ul {
    list-style-type: none;
    padding: 0;
  }
  
  .admin-support ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  .admin-support ul li button {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>  