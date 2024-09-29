<template>
  <div>
    <br />
    <div class="flex flex-col justify-center px-6 lg:px-8">
      <div class="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto p-4">
        <div
          class="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
          <div
            class="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
            <div>
              <h4 class="text-white text-lg font-semibold">Create Your Account</h4>
              <p class="text-[13px] text-gray-300 mt-3 leading-relaxed">
                Welcome to our registration page! Get started by creating your account.
              </p>
            </div>
            <div>
              <h4 class="text-white text-lg font-semibold">Simple & Secure Registration</h4>
              <p class="text-[13px] text-gray-300 mt-3 leading-relaxed">
                Our registration process is designed to be straightforward and secure.
                We prioritize your privacy and data security.
              </p>
            </div>
          </div>

          <form class="md:col-span-2 w-full py-6 px-6 sm:px-16" @submit.prevent="studentRegister">
            <div class="mb-6">
              <h3 class="text-gray-800 text-2xl font-bold">Create an account</h3>
            </div>

            <div class="space-y-6">
              <!-- Form Fields -->
              <div v-for="field in formFields" :key="field.id">
                <label :for="field.id" class="text-gray-800 text-sm mb-2 block">{{ field.label }}</label>
                <div class="relative flex items-center">
                  <input :id="field.id" v-model="field.model" :type="field.type"
                    class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    :placeholder="field.placeholder" />
                </div>
              </div>

              <!-- Password and Confirm Password -->
              <div>
                <label class="text-gray-800 text-sm mb-2 block">Password</label>
                <div class="relative flex items-center">
                  <input id="password" v-model="password" type="password" required
                    class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter your password" />
                </div>
              </div>
              <div>
                <label class="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                <div class="relative flex items-center">
                  <input id="cpassword" v-model="cpassword" type="password" required
                    class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter confirm password" />
                </div>
              </div>

              <!-- Terms Checkbox -->
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox"
                  class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label for="remember-me" class="ml-3 block text-sm text-gray-800">
                  I accept the
                  <a href="javascript:void(0);" class="text-blue-600 font-semibold hover:underline ml-1">Terms and
                    Conditions</a>
                </label>
              </div>
            </div>

            <div class="!mt-12">
              <label class="text-red-400 text-sm mb-2 block" v-if="error">{{ error }}</label>
              <button type="submit"
                class="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
                Create an account
              </button>
            </div>
            <p class="text-gray-800 text-sm mt-6 text-center">
              Already have an account?
              <a href="javascript:void(0);" class="text-blue-600 font-semibold hover:underline ml-1">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    // Define form fields with separate refs for models
    const formFields = ref([
      { id: 'firstname', label: 'First Name', model: '', type: 'text', placeholder: 'Enter your first name' },
      { id: 'lastname', label: 'Last Name', model: '', type: 'text', placeholder: 'Enter your last name' },
      { id: 'dob', label: 'Date of Birth', model: '', type: 'date', placeholder: 'Enter your date of birth' },
      { id: 'address', label: 'Address', model: '', type: 'text', placeholder: 'Enter your address' },
      { id: 'district', label: 'District', model: '', type: 'text', placeholder: 'Enter your district' },
      { id: 'city', label: 'City', model: '', type: 'text', placeholder: 'Enter your city' },
      { id: 'nic', label: 'National Identity Card (NIC)', model: '', type: 'text', placeholder: 'Enter your NIC' },
      { id: 'mobile', label: 'Mobile Number', model: '', type: 'text', placeholder: 'Enter your mobile number' },
      { id: 'whatsapp', label: 'Whatsapp Number', model: '', type: 'text', placeholder: 'Enter your Whatsapp number' },
      { id: 'email', label: 'Email', model: '', type: 'email', placeholder: 'Enter your email' },
      { id: 'username', label: 'Username', model: '', type: 'text', placeholder: 'Enter your username' },
    ]);

    const password = ref('');
    const cpassword = ref('');
    const error = ref('');

    const studentRegister = async () => {
      error.value = '';

      if (password.value !== cpassword.value) {
        error.value = 'Passwords do not match';
        return;
      }

      try {
        const formData = new FormData();
        formFields.value.forEach(field => {
          formData.append(field.id, field.model);
        });
        formData.append('password', password.value);
        formData.append('cpassword', cpassword.value);

        const response = await axios.post('http://localhost:8000/api/studentregister', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Check if there's a message in the response data
        if (response.data.error) {
          error.value = response.data.error;
        } else {
          error.value = 'Registration successful!'; // Optional success message handling
        }
        console.log(response.data);
      } catch (err) {
        console.error(err);
        // Display the error message from the server response
        if (err.response && err.response.data && err.response.data.error) {
          error.value = err.response.data.error;
        } else {
          error.value = 'An unexpected error occurred. Please try again.'; // Fallback error message
        }
      }
    };

    return {
      formFields,
      password,
      cpassword,
      error,
      studentRegister,
    };
  },
  name: 'signUp',
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
