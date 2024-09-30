<template>
  <nav class="bg-black border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <router-link to="/"
          class="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500"
          aria-current="page">
          <img class="h-8" alt="Logo" src="/img/logo.png" />
        </router-link>
      </a>

      <!-- Toggle Button -->
      <button id="navbar-toggle" type="button" @click="toggleNavbar"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default" :aria-expanded="isNavbarOpen">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>

      <!-- Navbar Links -->
      <div :class="{ 'hidden': !isNavbarOpen }" class="w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-black dark:border-gray-700">

          <li>
            <router-link to="/"
              class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500 mt-2"
              aria-current="page">Home</router-link>
          </li>

          <!-- Dropdown for logged-in users -->
          <li v-if="login" class="relative">
            <button @click="toggleDropdown" id="dropdownHoverButton"
              class="text-white hover:bg-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center"
              type="button">
              {{ jwt.data.username }} <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4" />
              </svg>
            </button>

            <!-- Dropdown menu for logged-in users -->
            <div v-show="isDropdownOpen" @mouseleave="isDropdownOpen = false"
              class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                <!-- Check if the user role is 'admin' -->
                <li v-if="jwt.data.role === 'admin'">
                  <router-link to="/admindashboard"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Admin
                    Dashboard</router-link>
                </li>
                <!-- Check if the user role is 'user' -->
                <li v-else-if="jwt.data.role === 'user'">
                  <router-link to="/dashboard"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</router-link>
                </li>
                <!-- Logout option for both roles -->
                <li>
                  <button @click="logout"
                    class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                    out</button>
                </li>
              </ul>
            </div>

          </li>

          <!-- Links for non-logged-in users -->
          <template v-else>
            <li>
              <router-link to="/login"
                class="block py-2 px-3 text-gray-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent mt-2">Sign
                In</router-link>
            </li>
            <li>
              <router-link to="/signup"
                class="block py-2 px-3 text-gray-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent mt-2">Sign
                Up</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { store } from '@/store/store'; // Adjust this import to your actual store path

export default {
  name: 'AppNavbar',
  data() {
    return {
      isNavbarOpen: false,
      isDropdownOpen: false,
    };
  },
  computed: {
    login() {
      return store.login;
    },
    jwt() {
      return store.jwt;
    }
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    logout() {
      localStorage.removeItem('token');
      store.login = false;
      store.jwt = {};
      this.$router.push('/login');
    }
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      store.login = true;
      const payload = JSON.parse(atob(token.split('.')[1]));
      store.jwt = payload;
    }
  }
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
