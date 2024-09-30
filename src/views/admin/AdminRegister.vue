<template>
  <div class="max-w-6xl mx-auto bg-white shadow p-6 rounded-lg w-full">
    <h2 class="text-2xl font-bold mb-6">Admin Registration</h2>
    <form @submit.prevent="registerAdmin">
      <div class="mb-4">
        <label for="name" class="block mb-2 text-sm">Name</label>
        <input v-model="name" type="text" id="name" class="w-full border px-4 py-2 rounded-md">
      </div>
      <div class="mb-4">
        <label for="email" class="block mb-2 text-sm">Email</label>
        <input v-model="email" type="email" id="email" class="w-full border px-4 py-2 rounded-md">
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-2 text-sm">Password</label>
        <input v-model="password" type="password" id="password" class="w-full border px-4 py-2 rounded-md">
      </div>
      <button class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Register</button>
    </form>
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
      // Add logic to register admin
      console.log(this.name, this.email, this.password);
    },
  },
};
</script>
