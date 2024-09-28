<template>
    <div>
      <h1>Admin</h1>
      <p>Welcome to your dashboard!</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$router.push({ name: 'Login' });
      }
    },
    name: 'AdminDashboard',
  };
  </script>
  