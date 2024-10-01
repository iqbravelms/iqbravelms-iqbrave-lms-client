<template>
  <div class="max-w-6xl mx-auto bg-white shadow p-6 rounded-lg w-full">
    <h2 class="text-2xl font-bold mb-6">All Students</h2>
    <div>
      <div v-if="loading">Loading module...</div>
      <div v-if="error" class="error">Error loading module: {{ error }}</div>

      <div v-if="users && users.length">
        <ul class="">
          <!-- Responsive Table Wrapper -->
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">id</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">firstname</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">lastname</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">dob</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 hidden lg:table-cell">address</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 hidden lg:table-cell">distict</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 hidden lg:table-cell">city</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">nic</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">mobile</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 hidden lg:table-cell">whatsapp</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 hidden lg:table-cell">email</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">username</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">stuid</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">role</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">status</th>
                  <th scope="col" colspan="3" class="px-2 sm:px-4 py-2 sm:py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in users" :key="student.id"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" class="px-2 sm:px-4 py-4 font-medium text-gray-900 dark:text-white">{{ student.id }}
                  </th>
                  <td class="px-2 sm:px-4 py-4">{{ student.firstname }}</td>
                  <td class="px-2 sm:px-4 py-4">{{ student.lastname }}</td>
                  <td class="px-2 sm:px-4 py-4 hidden md:table-cell">{{ student.dob }}</td>
                  <td class="px-2 sm:px-4 py-4 hidden lg:table-cell">{{ student.address }}</td>
                  <td class="px-2 sm:px-4 py-4 hidden lg:table-cell">{{ student.distict }}</td>
                  <td class="px-2 sm:px-4 py-4 hidden lg:table-cell">{{ student.city }}</td>
                  <td class="px-2 sm:px-4 py-4 hidden lg:table-cell">{{ student.nic }}</td>
                  <td class="px-2 sm:px-4 py-4 hidden md:table-cell">{{ student.mobile }}</td>
                  <td class="px-2 sm:px-4 py-4 hidden lg:table-cell">{{ student.whatsapp }}</td>
                  <td class="px-2 sm:px-4 py-4 hidden lg:table-cell">{{ student.email }}</td>
                  <td class="px-2 sm:px-4 py-4 hidden md:table-cell">{{ student.username }}</td>
                  <td class="px-2 sm:px-4 py-4 hidden md:table-cell">{{ student.StuId }}</td>
                  <td class="px-2 sm:px-4 py-4 hidden md:table-cell">{{ student.role }}</td>
                  <td class="px-2 sm:px-4 py-4 hidden md:table-cell">{{ student.status }}</td>
                  <td class="px-2 sm:px-4 py-4 text-right">
                    <button @click="getDataSelectData(student)"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </button>
                  </td>
                  <td class="px-2 sm:px-4 py-4 text-right">
                    <button v-if="student.status === 0" @click="activateUser(student.id)"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Activate</button>
                    <button v-if="student.status === 1" @click="deactivateUser(student.id)"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Deactivate</button>
                    <button v-if="student.status === 0" @click="deleteUser(student.id)"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ul>
      </div>
    </div>

    <!-- Responsive Admin Registration Form -->
    <div class="mt-10">
      <button class="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 p-2" @click="addNewUser()">Add new user
        +</button>
      <h2 class="text-2xl font-bold mb-6">Admin Update</h2>
      <form @submit.prevent="adminUpdate">
        <div class="mb-4" v-if="edit === true">
          <label for="id" class="block mb-2 text-sm ">ID</label>
          <input v-model="id" type="text" id="id" class="w-full border px-2 sm:px-4 py-2 rounded-md" disabled>
        </div>
        <div class="mb-4">
          <label for="firstname" class="block mb-2 text-sm">firstname</label>
          <input v-model="firstname" type="text" id="firstname" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>
        <div class="mb-4">
          <label for="lastname" class="block mb-2 text-sm">lastname</label>
          <input v-model="lastname" type="lastname" id="lastname" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>
        <div class="mb-4">
          <label for="dob" class="block mb-2 text-sm">dob</label>
          <input v-model="dob" type="date" id="dob" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>
        <div class="mb-4">
          <label for="address" class="block mb-2 text-sm">address</label>
          <input v-model="address" type="address" id="address" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>
        <div class="mb-4">
          <label for="district" class="block mb-2 text-sm">district</label>
          <input v-model="district" type="district" id="district" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>
        <div class="mb-4">
          <label for="city" class="block mb-2 text-sm">city</label>
          <input v-model="city" type="city" id="city" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>
        <div class="mb-4">
          <label for="nic" class="block mb-2 text-sm">nic</label>
          <input v-model="nic" type="nic" id="nic" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>
        <div class="mb-4">
          <label for="mobile" class="block mb-2 text-sm">mobile</label>
          <input v-model="mobile" type="mobile" id="mobile" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>
        <div class="mb-4">
          <label for="whatsapp" class="block mb-2 text-sm">whatsapp</label>
          <input v-model="whatsapp" type="whatsapp" id="whatsapp" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2 text-sm">email</label>
          <input v-model="email" type="email" id="email" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>


        <div class="mb-4">
          <label for="username" class="block mb-2 text-sm">username</label>
          <input v-model="username" type="username" id="username" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2 text-sm">password</label>
          <input v-model="password" type="password" id="password" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>
        <div class="mb-4">
          <label for="cpassword" class="block mb-2 text-sm">Confirm password</label>
          <input v-model="cpassword" type="password" id="cpassword" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>
        <div class="mb-4">
          <label for="role" class="block mb-2 text-sm">Role</label>
          <select v-model="role" id="role" class="w-full border px-2 sm:px-4 py-2 rounded-md">

            <option value="user">user</option>
          </select>
        </div>


        <button v-if="edit === true" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          @click="updateUser()">Update</button>
        <button v-if="edit === false" @click="userRegister()"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const users = ref([]); // Admin data list
    const id = ref('');
    const firstname = ref('');
    const lastname = ref('');
    const dob = ref('');
    const address = ref('');
    const district = ref('');
    const city = ref('');
    const nic = ref('');
    const mobile = ref('');
    const whatsapp = ref('');
    const email = ref('');
    const username = ref('');
    const password = ref('');
    const cpassword = ref('');
    const role = ref('');
    const error = ref(null); // Error handling
    const loading = ref(true); // Loading state
    const edit = ref(false);

    const loadAdmins = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:8000/api/allstudent', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
          },
        });

        users.value = response.data.users; // Set users array from the response
      } catch (err) {
        if (err.response && err.response.status === 401) {
          router.push({ name: 'Login' }); // Redirect to login if unauthorized
          localStorage.removeItem('token');
        }
        error.value = err.message; // Set error message
      } finally {
        loading.value = false; // Set loading to false after fetching
      }
    };

    const deactivateUser = async (id) => {
      const token = localStorage.getItem('token');
      loading.value = true; // Set loading to true when starting the request

      try {
        const response = await axios.get(`http://localhost:8000/api/deactivatestudent/${id}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
          },
        });

        loadAdmins(); // Call to reload the admins list
        console.log(response.data);
        // Optionally update users array from response
        // users.value = response.data.users; 
      } catch (err) {
        if (err.response && err.response.status === 401) {
          router.push({ name: 'Login' }); // Redirect to login if unauthorized
          localStorage.removeItem('token');
        }
        error.value = err.message; // Set error message
      } finally {
        loading.value = false; // Set loading to false after fetching
      }
    };
    const activateUser = async (id) => {
      const token = localStorage.getItem('token');
      loading.value = true; // Set loading to true when starting the request

      try {
        const response = await axios.get(`http://localhost:8000/api/activatestudent/${id}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
          },
        });

        loadAdmins(); // Call to reload the admins list
        console.log(response.data);
        // Optionally update users array from response
        // users.value = response.data.users; 
      } catch (err) {
        if (err.response && err.response.status === 401) {
          router.push({ name: 'Login' }); // Redirect to login if unauthorized
          localStorage.removeItem('token');
        }
        error.value = err.message; // Set error message
      } finally {
        loading.value = false; // Set loading to false after fetching
      }
    };
    const deleteUser = async (id) => {
      const token = localStorage.getItem('token');
      loading.value = true; // Set loading to true when starting the request

      try {
        const response = await axios.get(`http://localhost:8000/api/deletestudent/${id}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
          },
        });

        loadAdmins(); // Call to reload the admins list
        console.log(response.data);
        // Optionally update users array from response
        // users.value = response.data.users; 
      } catch (err) {
        if (err.response && err.response.status === 401) {
          router.push({ name: 'Login' }); // Redirect to login if unauthorized
          localStorage.removeItem('token');
        }
        error.value = err.message; // Set error message
      } finally {
        loading.value = false; // Set loading to false after fetching
      }
    };


    const updateUser = async () => {
      if (edit.value && password.value === cpassword.value) {
        const token = localStorage.getItem('token');

        try {
          const formData = new FormData();
          formData.append('id', id.value);
          formData.append('firstname', firstname.value);
          formData.append('lastname', lastname.value);
          formData.append('dob', dob.value);
          formData.append('address', address.value);
          formData.append('district', district.value);
          formData.append('city', city.value);
          formData.append('nic', nic.value);
          formData.append('mobile', mobile.value);
          formData.append('whatsapp', whatsapp.value);
          formData.append('email', email.value);
          formData.append('username', username.value);
          formData.append('password', password.value);
          formData.append('cpassword', cpassword.value);
          formData.append('role', role.value);

          const response = await axios.post('http://localhost:8000/api/updatestudent', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${token}`,
            },
          });
          loadAdmins();
          console.log(response.data)
          // users.value = response.data.users; // Update users array from response
        } catch (err) {
          if (err.response && err.response.status === 401) {
            router.push({ name: 'Login' }); // Redirect to login if unauthorized
            localStorage.removeItem('token');
          }
          error.value = err.message; // Set error message
        } finally {
          loading.value = false; // Set loading to false after fetching
        }
      }
    };
    const userRegister = async () => {
      if (edit.value == false && password.value === cpassword.value) {
        console.log("hee");
        const token = localStorage.getItem('token');

        try {
          const formData = new FormData();
          formData.append('id', id.value);
          formData.append('firstname', firstname.value);
          formData.append('lastname', lastname.value);
          formData.append('dob', dob.value);
          formData.append('address', address.value);
          formData.append('district', district.value);
          formData.append('city', city.value);
          formData.append('nic', nic.value);
          formData.append('mobile', mobile.value);
          formData.append('whatsapp', whatsapp.value);
          formData.append('email', email.value);
          formData.append('username', username.value);
          formData.append('password', password.value);
          formData.append('cpassword', cpassword.value);
          formData.append('role', role.value);



          const response = await axios.post('http://localhost:8000/api/studentregister', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${token}`,
            },
          });
          console.log(response.data)
          // users.value = response.data.users; // Update users array from response
        } catch (err) {
          if (err.response && err.response.status === 401) {
            router.push({ name: 'Login' }); // Redirect to login if unauthorized
            localStorage.removeItem('token');
          }
          error.value = err.message; // Set error message
        } finally {
          loading.value = false; // Set loading to false after fetching
        }
      }
    };

    const addNewUser = () => {
      edit.value = false;
      id.value = '';
      firstname.value = '';
      lastname.value = '';
      dob.value = '';
      district.value = '';
      city.value = '';
      mobile.value = '';
      whatsapp.value = '';
      email.value = '';
      address.value = '';
      nic.value = '';
      username.value = '';
      password.value = '';
      cpassword.value = '';
      role.value = '';
    };

    // Populate form fields with the selected admin data
    const getDataSelectData = (student) => {
      edit.value = true;
      id.value = student.id;
      firstname.value = student.firstname;
      lastname.value = student.lastname;
      dob.value = student.dob;
      address.value = student.address;
      district.value = student.district;
      city.value = student.city;
      nic.value = student.nic;
      mobile.value = student.mobile;
      whatsapp.value = student.whatsapp;
      email.value = student.email;
      username.value = student.username;
      role.value = student.role;
    };

    // Call loadAdmins when the component is mounted
    onMounted(() => {
      loadAdmins();
    });

    // Return all variables and methods for template usage
    return {
      users,
      id,
      firstname,
      lastname,
      mobile,
      whatsapp,
      email,
      address,
      nic,
      username,
      password,
      cpassword,
      role,
      error,
      loading,
      edit,
      dob,
      district,
      city,
      loadAdmins,
      updateUser,
      userRegister,
      addNewUser,
      deactivateUser,
      activateUser,
      getDataSelectData,
      deleteUser,
    };
  },
};
</script>
