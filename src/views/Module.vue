<template>
    <div>
      <h1>Module Page</h1>
      <div v-if="loading">Loading module...</div>
      <div v-if="error" class="error">Error loading module: {{ error }}</div>
      
      <div v-if="modules && modules.length">
        <h2>Modules:</h2>
        <ul>
          <li v-for="module in modules" :key="module.id">{{ module.name }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // Import Axios
  import { ref, onMounted } from 'vue'; // Import necessary functions
  
  export default {
    setup() {
      const modules = ref([]);
      const loading = ref(true);
      const error = ref(null);
  
      const loadModule = async () => {
        const courseId = localStorage.getItem('courseId'); // Retrieve the courseId from localStorage
        try {
          const response = await axios.get(`http://localhost:8000/api/modules/${courseId}`);
          modules.value = response.data.modules; // Adjust based on your actual API response
        } catch (err) {
          error.value = err.message; // Set error message
        } finally {
          loading.value = false; // Set loading to false after fetching
        }
      };
  
      onMounted(() => {
        loadModule(); // Load modules when the component is mounted
      });
  
      return {
        modules,
        loading,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  