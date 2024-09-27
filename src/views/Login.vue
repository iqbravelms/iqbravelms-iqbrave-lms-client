<template>
  <div>
    <form @submit.prevent="login">
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img class="mx-auto h-20 w-auto" src="/img/logo1.png">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div class="space-y-6">
            <div>
              <label for="username" class="block text-sm font-medium leading-6 text-gray-900">username address</label>
              <div class="mt-2">
                <input
                  id="username"
                  v-model="username"
                  name="username"
                  type="username"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                />
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  v-model="password"
                  name="password"
                  type="password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                />
              </div>
            </div>
            <div>
              <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500">
                Sign in
              </button>
            </div>
          </div>
          <p class="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <router-link to="/signup" class="font-semibold text-indigo-600 hover:text-indigo-500">Create an account</router-link>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

async function login() {
  try {
    // Check the username and password values
    console.log('Logging in with:', username.value, password.value);

    const data = new URLSearchParams();
    data.append('username', username.value);
    data.append('password', password.value);

    const response = await axios.post('http://localhost:8000/api/signin', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Save JWT token in localStorage
    localStorage.setItem('token', response.data.token);

    // Redirect to dashboard after successful login
    router.push('/lesson');
  } catch (error) {
    console.error('Login failed:', error);
    alert('Invalid credentials');
  }
}

</script>

<style scoped>
/* Add your styles here */
</style>
