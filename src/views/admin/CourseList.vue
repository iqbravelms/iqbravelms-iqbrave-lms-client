<template>
  <div class="max-w-6xl mx-auto bg-white shadow p-6 rounded-lg w-full">
    <h2 class="text-2xl font-bold mb-6">All Students</h2>
    <div>
      <div v-if="loading">Loading module...</div>
      <div v-if="error" class="error">Error loading module: {{ error }}</div>

      <div v-if="courses && courses.length">
        <ul class="">
          <!-- Responsive Table Wrapper -->
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">id</th>
                  <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">name</th>
                  <th scope="col" colspan="3" class="px-2 sm:px-4 py-2 sm:py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="course in courses" :key="course.id"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" class="px-2 sm:px-4 py-4 font-medium text-gray-900 dark:text-white">{{ course.id }}
                  </th>
                  <td class="px-2 sm:px-4 py-4">{{ course.name }}</td>

                  <td class="px-2 sm:px-4 py-4 text-right">
                    <button @click="getDataSelectData(course)"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </button>
                  </td>
                  <td class="px-2 sm:px-4 py-4 text-right">
                    <button v-if="course.status === 1" @click="deactivateUser(course.id)"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Deactivate</button>
                    <button @click="deleteCourse(course.id)"
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
          <label for="name" class="block mb-2 text-sm">name</label>
          <input v-model="name" type="text" id="name" class="w-full border px-2 sm:px-4 py-2 rounded-md">
        </div>

        <button v-if="edit === true" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          @click="updateCourse()">Update</button>
        <button v-if="edit === false" @click="CourseRegister()"
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
    const courses = ref([]); // Admin data list
    const id = ref('');
    const name = ref('');
    const error = ref(null); // Error handling
    const loading = ref(true); // Loading state
    const edit = ref(false);

    const loadCourses = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:8000/api/allcourse', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
          },
        });


        courses.value = response.data.courses; // Set users array from the response
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

    const deleteCourse = async (id) => {
      const token = localStorage.getItem('token');
      loading.value = true; // Set loading to true when starting the request

      try {
        const response = await axios.get(`http://localhost:8000/api/deletecourse/${id}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
          },
        });

        loadCourses(); // Call to reload the admins list
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


    const updateCourse = async () => {
      if (edit.value) {
        const token = localStorage.getItem('token');

        try {
          const formData = new FormData();
          formData.append('id', id.value);
          formData.append('name', name.value);

          const response = await axios.post('http://localhost:8000/api/updatecourse', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${token}`,
            },
          });
          loadCourses();
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
    const CourseRegister = async () => {
      if (edit.value == false) {
        console.log("hee");
        const token = localStorage.getItem('token');

        try {
          const formData = new FormData();
          formData.append('name', name.value);


          const response = await axios.post('http://localhost:8000/api/courseregister', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${token}`,
            },
          });
          loadCourses();
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
      name.value = '';
    };

    // Populate form fields with the selected admin data
    const getDataSelectData = (student) => {
      edit.value = true;
      id.value = student.id;
      name.value = student.name;
    };

    // Call loadCourses when the component is mounted
    onMounted(() => {
      loadCourses();
    });

    // Return all variables and methods for template usage
    return {
      edit,
      courses,
      id,
      name,
      loadCourses,
      updateCourse,
      CourseRegister,
      addNewUser,
      getDataSelectData,
      deleteCourse,
    };
  },
};
</script>
