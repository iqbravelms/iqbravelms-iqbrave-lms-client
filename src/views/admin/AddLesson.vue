<template>
    <div class="max-w-6xl mx-auto bg-white shadow p-6 rounded-lg w-full">
        <label for="" class="text-xl font-bold mb-6">Select Course name :</label>
        <select name="" id="" class="text-xl mb-6" @change="loadModules($event.target.value)">
            <option value="" selected>Select Course</option>

            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.name }}</option>
        </select><br>
        <label for="" class="text-xl font-bold mb-6">Select Module :</label>
        <select name="" id="" class="text-xl mb-6" @change="loadLessons($event.target.value)">
            <option value="" selected>Select Module</option>
            <option v-for="module in modules" :key="module.id" :value="module.id">{{ module.name }}</option>
        </select>
        <br>

        <!-- Responsive Table Wrapper -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <label for="" class="text-xl font-bold mb-6">database lessons :</label>
            <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">ID</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">ModuleId</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Topic</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Link</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Note</th>
                        <th scope="col" colspan="3" class="px-2 sm:px-4 py-2 sm:py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="lesson in lessons" :key="lesson.id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-2 sm:px-4 py-4 font-medium text-gray-900 dark:text-white">
                            {{ lesson.id }}</th>
                        <td class="px-2 sm:px-4 py-4">{{ lesson.ModuleId }}</td>
                        <td class="px-2 sm:px-4 py-4">{{ lesson.topic }}</td>
                        <td class="px-2 sm:px-4 py-4">{{ lesson.link }}</td>
                        <td class="px-2 sm:px-4 py-4">{{ lesson.Note }}</td>
                        <td class="px-2 sm:px-4 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                        <td class="px-2 sm:px-4 py-4 text-right">
                            <a href="#"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Deactivate</a>
                        </td>
                    </tr>
                    <!-- Repeat rows for other products -->
                </tbody>
            </table>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <label for="" class="text-xl font-bold mb-6">lessons Steps:</label>
           
        </div>

        <!-- Responsive Admin Registration Form -->
        <div class="mt-10">
            <h2 class="text-2xl font-bold mb-6">Add Lesson</h2>
            <form @submit.prevent="registerAdmin">
                <div class="mb-4">
                    <label for="name" class="block mb-2 text-sm">Topic</label>
                    <input v-model="name" type="text" id="name" class="w-full border px-2 sm:px-4 py-2 rounded-md">
                    <label for="name" class="block mb-2 text-sm">Link</label>
                    <input v-model="name" type="text" id="name" class="w-full border px-2 sm:px-4 py-2 rounded-md">
                    <label for="name" class="block mb-2 text-sm">Name</label>
                    <input v-model="name" type="text" id="name" class="w-full border px-2 sm:px-4 py-2 rounded-md">

                    <label for="name" class="block mb-2 text-sm">Add steps</label>

                    <div v-for="(step, index) in steps" :key="index" class="mb-4">
                        <label :for="'step-' + index" class="block mb-2 text-sm">Step {{ index + 1 }}</label>
                        <input v-model="steps[index]" :id="'step-' + index" type="text"
                            class="w-full border px-2 sm:px-4 py-2 rounded-md" />
                    </div>
                    <button @click="addStep"
                        class="px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-blue-900  bg-blue-700 text-white">
                        Add more steps +
                    </button>

                </div>

                <button class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Add Module</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
export default {
    setup() {
        const courses = ref([]);
        const router = useRouter();
        const modules = ref([]);
        const lessons = ref([]);
        const loading = ref(true); // Loading state
        const error = ref(null); // Error handling
        const loadCourses = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('http://localhost:8000/api/getcoursewithmodule', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                courses.value = response.data.courses;
                console.log(response.data);
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
        const loadModules = async (id) => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`http://localhost:8000/api/getallmodules/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                modules.value = response.data.modules;
                console.log(response.data); // Handle modules response
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    router.push({ name: 'Login' }); // Redirect to login if unauthorized
                    localStorage.removeItem('token');
                }
                error.value = err.message; // Set error message
            }
        };
        const loadLessons = async (id) => {

            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`http://localhost:8000/api/getalesson/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                lessons.value = response.data.lessons;
                console.log(response.data); // Handle modules response
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    router.push({ name: 'Login' }); // Redirect to login if unauthorized
                    localStorage.removeItem('token');

                }
                error.value = err.message; // Set error message
            }
        };
        onMounted(() => {
            loadCourses();
        });
        return {
            courses,
            lessons,
            loadCourses,
            loadModules,
            loadLessons,
            modules
        }
    },
    name: 'AddLesson'
};
</script>