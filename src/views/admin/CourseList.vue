<template>
    <div class="max-w-6xl mx-auto bg-white shadow p-6 rounded-lg w-full">
      <h2 class="text-2xl font-bold mb-6">All Courses</h2>
      
      <!-- Responsive Table Wrapper -->
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Product name</th>
              <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Color</th>
              <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Category</th>
              <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Price</th>
              <th scope="col" colspan="3" class="px-2 sm:px-4 py-2 sm:py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" class="px-2 sm:px-4 py-4 font-medium text-gray-900 dark:text-white">Apple MacBook Pro 17"</th>
              <td class="px-2 sm:px-4 py-4">Silver</td>
              <td class="px-2 sm:px-4 py-4">Laptop</td>
              <td class="px-2 sm:px-4 py-4">$2999</td>
              <td class="px-2 sm:px-4 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
              <td class="px-2 sm:px-4 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Deactivate</a>
              </td>
            </tr>
            <!-- Repeat rows for other products -->
          </tbody>
        </table>
      </div>
  
      <!-- Responsive Admin Registration Form -->
      <div class="mt-10">
        <h2 class="text-2xl font-bold mb-6">Add Course</h2>
        <form @submit.prevent="registerAdmin">
          <div class="mb-4">
            <label for="name" class="block mb-2 text-sm">Name</label>
            <input v-model="name" type="text" id="name" class="w-full border px-2 sm:px-4 py-2 rounded-md">
          </div>
          <div class="mb-4">
            <label for="email" class="block mb-2 text-sm">Email</label>
            <input v-model="email" type="email" id="email" class="w-full border px-2 sm:px-4 py-2 rounded-md">
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-2 text-sm">Password</label>
            <input v-model="password" type="password" id="password" class="w-full border px-2 sm:px-4 py-2 rounded-md">
          </div>
          <button class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Register</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
      registerAdmin() {
        console.log(this.name, this.email, this.password);
      },
    },
    name: 'CourseList'
  };
  </script>
  