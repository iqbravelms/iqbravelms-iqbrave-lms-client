<template>
    <div class="max-w-6xl mx-auto bg-white shadow p-6 rounded-lg w-full">
        <h2 class="text-2xl font-bold mb-6">Show Modules</h2>
        <h2 class="text-2xl font-bold mb-6" v-if="error">{{error}}</h2>
        <label for="" class="text-xl font-bold mb-6">Select Course name :</label>
        <select name="" id="" class="text-xl mb-6" @change="loadModules($event.target.value)">
            <option value="Select">Select Course name</option>
            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.name }}</option>
        </select>


        <!-- Responsive Table Wrapper -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">ID</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">CourseID</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">module name</th>
                        <th scope="col" colspan="3" class="px-2 sm:px-4 py-2 sm:py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(module, index) in modules" :key="module.id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-2 sm:px-4 py-4 font-medium text-gray-900 dark:text-white">{{ module.id
                            }}</th>
                        <td class="px-2 sm:px-4 py-4">{{ modules[index].CourseId }}</td>
                        <td class="px-2 sm:px-4 py-4">{{ modules[index].name }}</td>

                        <td class="px-2 sm:px-4 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                @click="getDataSelectData(modules[index].id, modules[index].CourseId, modules[index].name)">Edit</a>
                        </td>
                        <td class="px-2 sm:px-4 py-4 text-right">
                            <a href="#" @click="deleteModule(modules[index].id)"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Deactivate</a>
                        </td>
                    </tr>
                    <!-- Repeat rows for other products -->
                </tbody>
            </table>
        </div>

        <!-- Responsive Admin Registration Form -->
        <div class="mt-10">
            <h2 class="text-2xl font-bold mb-6">Add Module</h2>
            <form>
                <label for="" class="text-xl font-bold mb-6">Select Course name :</label>
                <select name="" id="" class="text-xl mb-6" v-model="courseId">
                    <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.name }}</option>
                </select>
                <div class="mb-4" v-if="edit === true">
                    <label for="courseId" class="block mb-2 text-sm ">Course ID</label>
                    <input v-model="courseId" type="text" id="courseId"
                        class="w-full border px-2 sm:px-4 py-2 rounded-md" disabled>
                </div>
                <div class="mb-4" v-if="edit === true">
                    <label for="moduleId" class="block mb-2 text-sm ">Module ID</label>
                    <input v-model="moduleId" type="text" id="moduleId"
                        class="w-full border px-2 sm:px-4 py-2 rounded-md" disabled>
                </div>
                <div class="mb-4">
                    <label for="moduleName" class="block mb-2 text-sm">Module Name</label>
                    <input v-model="moduleName" type="text" id="moduleName"
                        class="w-full border px-2 sm:px-4 py-2 rounded-md">
                </div>

                <button @click="updateModule()" v-if="edit === true" type="submit"
                    class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Update
                </button>
                <button @click="addModules()" v-if="edit === false" type="submit"
                    class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Add Module
                </button>
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
        const modules = ref([]);
        const router = useRouter();
        const error = ref(null); // Error handling
        const loading = ref(true); // Loading state
        const courseId = ref(''); // Loading state
        const moduleName = ref(''); // Loading state
        const moduleId = ref(''); // Loading state
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
                if (response.data.status === 'error') {
                    error.value = response.data.message;
                }
                console.log(response.data)
                courseId.value = response.data.courses[0].id;
                courses.value = response.data.courses;
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
        const getDataSelectData = (mId, cId, name) => {
            console.log(name);
            edit.value = true;  // Set edit mode to true
            moduleId.value = mId;  // Assign moduleId to the module being edited
            courseId.value = cId;  // Assign courseId to the course being edited
            moduleName.value = name;  // Assign module name to the selected module
        };

        const addModules = async () => {

            const token = localStorage.getItem('token');

            try {
                const formData = new FormData();
                formData.append('courseId', courseId.value);
                formData.append('moduleName', moduleName.value);

                const response = await axios.post('http://localhost:8000/api/addmodule', formData, {
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

        };
        const updateModule = async () => {
            const token = localStorage.getItem('token');

            try {
                const formData = new FormData();
                formData.append('id', moduleId.value);
                formData.append('name', moduleName.value);

                const response = await axios.post('http://localhost:8000/api/updatemodule', formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(response.data)
                await loadModules(courseId.value);
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

        };
        const deleteModule = async (id) => {
            const token = localStorage.getItem('token');
            loading.value = true; // Set loading to true when starting the request

            try {
                const response = await axios.get(`http://localhost:8000/api/deletemodule/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                await loadModules(courseId.value);// Call to reload the admins list
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
        onMounted(() => {
            loadCourses();
        });
        return {
            loadModules,
            courses,
            modules,
            moduleId,
            courseId,
            moduleName,
            loadCourses,
            addModules,
            updateModule,
            getDataSelectData,
            deleteModule,
            edit,
        };
    },
    name: 'ModuleList'
};
</script>