<template>
  <div id="app" class="p-0"> <!-- Using Tailwind utility class for padding -->
    <Navbar /> <!-- Include Navbar here -->
    <router-view /> <!-- This will render the matched component -->
    <Footer /> <!-- Include Navbar here -->
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'; // Import the Navbar component
import Footer from './components/Footer.vue'; // Import the Navbar component
</script>

<style></style>
