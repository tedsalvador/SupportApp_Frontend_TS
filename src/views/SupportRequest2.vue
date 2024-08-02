<template>
    <div>
      <h1>Support Requests</h1>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>
      <form @submit.prevent="createSupportRequest">
        <textarea v-model="description" placeholder="Enter your support request"></textarea>
        <select v-model="supportType">
          <option disabled value="">Select a type</option>
          <option v-for="type in supportTypes" :key="type">{{ type }}</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <h2>Your Support Requests</h2>
      <ul>
        <li v-for="request in supportRequests" :key="request.id_support">
          <span>{{ request.id_support }} - {{ request.description }} - {{ request.status }}</span>
          <button @click="cancelRequest(request.id_support)">Cancel</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const supportRequests = ref([]);
  const supportTypes = ref(['Technical', 'Billing', 'General']);
  const description = ref('');
  const supportType = ref('');
  const error = ref('');
  const success = ref('');
  
  const fetchSupportRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/supportRequests');
      supportRequests.value = response.data;
    } catch (err) {
      error.value = 'Failed to load support requests';
    }
  };
  
  const createSupportRequest = async () => {
    if (!description.value || !supportType.value) {
      error.value = 'Please fill in all fields';
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/supportRequests', {
        description: description.value,
        supportType: supportType.value
      });
      success.value = 'Support request created successfully!';
      fetchSupportRequests(); // Refresh the list
    } catch (err) {
      error.value = 'Failed to create support request';
    }
  };
  
  const cancelRequest = async (id_support) => {
    try {
      await axios.delete(`http://localhost:8080/api/supportRequests/${id_support}`);
      success.value = 'Support request canceled successfully!';
      fetchSupportRequests(); // Refresh the list
    } catch (err) {
      error.value = 'Failed to cancel support request';
    }
  };
  
  onMounted(fetchSupportRequests);
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  </style>
  