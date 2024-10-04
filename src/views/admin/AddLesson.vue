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
                    <tr v-for="lesson in lessons" :key="lesson.id" @click.prevent="loadSteps(lesson.id)"
                        class="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-2 sm:px-4 py-4 font-medium text-gray-900 dark:text-white">
                            {{ lesson.id }}</th>
                        <td class="px-2 sm:px-4 py-4">{{ lesson.ModuleId }}</td>
                        <td class="px-2 sm:px-4 py-4">{{ lesson.topic }}</td>
                        <td class="px-2 sm:px-4 py-4">{{ lesson.link }}</td>
                        <td class="px-2 sm:px-4 py-4">{{ lesson.Note }}</td>
                        <td class="px-2 sm:px-4 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                @click="editLesson(lesson)">Edit</a>
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
            <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">ID</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">LessonId</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">StepNo</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Description</th>
                        <th scope="col" colspan="3" class="px-2 sm:px-4 py-2 sm:py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="step in steps" :key="step.id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-2 sm:px-4 py-4 font-medium text-gray-900 dark:text-white">
                            {{ step.id }}</th>
                        <td class="px-2 sm:px-4 py-4">{{ step.LessonId }}</td>
                        <td class="px-2 sm:px-4 py-4">{{ step.StepNo }}</td>
                        <td class="px-2 sm:px-4 py-4">{{ step.description }}</td>
                        <td class="px-2 sm:px-4 py-4 text-right">
                            <a @click="editStep(step)" href="#"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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

        <!-- Responsive Admin Registration Form -->
        <div class="mt-10" v-if="lessonEdit === true && stepEdit === false">
            <!-- edit lesson -->
            <div>
                <h2 class="text-2xl font-bold mb-6">Edit Lesson</h2>

                <label for="">ID</label>
                <input type="text" name="" id="" v-model="lessonId"
                    class="w-full border px-2 sm:px-4 py-2 rounded-md"><br>
                <label for="">MODULEID</label>
                <input type="text" name="" id="" v-model="moduleId"
                    class="w-full border px-2 sm:px-4 py-2 rounded-md"><br>
                <label for="">TOPIC</label>
                <input type="text" name="" id="" v-model="topic" class="w-full border px-2 sm:px-4 py-2 rounded-md"><br>
                <label for="">LINK</label>
                <input type="text" name="" id="" v-model="link" class="w-full border px-2 sm:px-4 py-2 rounded-md"><br>
                <label for="">NOTE</label>
                <input type="text" name="" id="" v-model="note" class="w-full border px-2 sm:px-4 py-2 rounded-md"><br>

            </div>

            <button class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                @click="updateLesson()">Update Lesson</button>

        </div>
        <!-- edit step -->
        <div class="mt-10" v-if="lessonEdit === false && stepEdit === true">
            <div>
                <h2 class="text-2xl font-bold mb-6">Edit Step</h2>

                <label for="">StepId</label>
                <input type="text" name="" id="" v-model="stepId"
                    class="w-full border px-2 sm:px-4 py-2 rounded-md"><br>
                <label for="">LessonId</label>
                <input type="text" name="" id="" v-model="LessonId"
                    class="w-full border px-2 sm:px-4 py-2 rounded-md"><br>
                <label for="">StepNo</label>
                <input type="text" name="" id="" v-model="stepNo"
                    class="w-full border px-2 sm:px-4 py-2 rounded-md"><br>
                <label for="">Description</label>
                <input type="text" name="" id="" v-model="stepDescription"
                    class="w-full border px-2 sm:px-4 py-2 rounded-md"><br>

            </div>

            <button class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700" @click="updateStep()">Update
                Step</button>

        </div>
        <!-- Add section -->
        <div>
            <h2 class="text-2xl font-bold mb-6">Add Lesson</h2>
            <form @submit.prevent="registerAdmin">

                <div class="mb-4">
                    <label for="topicName" class="block mb-2 text-sm">Topic</label>
                    <input v-model="topicName" type="text" id="topicName"
                        class="w-full border px-2 sm:px-4 py-2 rounded-md" />

                    <label for="linkName" class="block mb-2 text-sm">Link</label>
                    <input v-model="linkName" type="text" id="linkName"
                        class="w-full border px-2 sm:px-4 py-2 rounded-md" />

                    <label for="noteName" class="block mb-2 text-sm">Note</label>
                    <input v-model="noteName" type="text" id="noteName"
                        class="w-full border px-2 sm:px-4 py-2 rounded-md" />

                    <div>
                        <label for="name" class="block mb-2 text-sm">Add steps</label>

                        <!-- Loop through stepsAdd array to display each step input -->
                        <div v-for="(step, index) in stepsAdd" :key="index" class="mb-4">
                            <label :for="'step-no' + index" class="block mb-2 text-sm">Step No {{ index + 1 }}</label>
                            <input v-model="stepsAdd[index].number" :id="'step-no' + index" type="text"
                                class="w-full border px-2 sm:px-4 py-2 rounded-md" />
                            <label :for="'step-description' + index" class="block mb-2 text-sm">Description {{ index + 1
                                }}</label>
                            <input v-model="stepsAdd[index].description" :id="'step-description' + index" type="text"
                                class="w-full border px-2 sm:px-4 py-2 rounded-md" />
                        </div>

                        <!-- Add more steps when the button is clicked -->
                        <button @click="addMoreStep"
                            class="px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-blue-900 bg-blue-700 text-white">
                            Add more steps +
                        </button>
                    </div>

                    <!-- Submit the lesson -->
                    <button @click="addLesson" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                        Add Module
                    </button>
                </div>
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
        const stepId = ref('');
        const LessonId = ref('');
        const stepNo = ref('');
        const stepDescription = ref('');
        const lessonId = ref('');
        const lessonEdit = ref(false);
        const stepEdit = ref(false);
        const moduleId = ref('');
        const topic = ref('');
        const link = ref('');
        const note = ref('');
        const courses = ref([]);
        const router = useRouter();
        const modules = ref([]);
        const steps = ref([]);
        const lessons = ref([]);
        const loading = ref(true); // Loading state
        const error = ref(null); // Error handling
        const topicName = ref('');
        const linkName = ref('');
        const noteName = ref('');
        const stepsAdd = ref([{ number: '', description: '' }]);
        const addLesson = async () => {
            const token = localStorage.getItem('token');
            try {
                const formData = new FormData();
                formData.append('moduleId', moduleId.value);
                formData.append('topicName', topicName.value);
                formData.append('linkName', linkName.value);
                formData.append('noteName', noteName.value);
                formData.append('steps', JSON.stringify(stepsAdd.value)); // Convert stepsAdd to a JSON string

                const response = await axios.post('http://localhost:8000/api/lessonadd', formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                // Handle success here, e.g., clear form or give feedback
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    router.push({ name: 'Login' }); // Redirect to login if unauthorized
                    localStorage.removeItem('token');
                }
                console.error(err.message); // Handle error message
            }
        };
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
            moduleId.value = id;

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
                const response = await axios.get(`http://localhost:8000/api/getlesson/${id}`, {
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
        const loadSteps = async (id) => {

            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`http://localhost:8000/api/getsteps/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                steps.value = response.data.steps;
                console.log(response.data); // Handle modules response
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    router.push({ name: 'Login' }); // Redirect to login if unauthorized
                    localStorage.removeItem('token');

                }
                error.value = err.message; // Set error message
            }
        };
        const updateLesson = async () => {
            const token = localStorage.getItem('token');

            try {
                const formData = new FormData();
                formData.append('lessonId', lessonId.value);
                formData.append('moduleId', moduleId.value);
                formData.append('topic', topic.value);
                formData.append('link', link.value);
                formData.append('note', note.value);

                const response = await axios.post('http://localhost:8000/api/updatelesson', formData, {
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
        const updateStep = async () => {
            const token = localStorage.getItem('token');

            try {
                const formData = new FormData();
                formData.append('stepId', stepId.value);
                formData.append('LessonId', LessonId.value);
                formData.append('stepNo', stepNo.value);
                formData.append('stepDescription', stepDescription.value);

                const response = await axios.post('http://localhost:8000/api/updatestep', formData, {
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
        const editLesson = (lesson) => {
            stepEdit.value = false;
            lessonEdit.value = true;
            lessonId.value = lesson.id;
            moduleId.value = lesson.ModuleId;
            topic.value = lesson.topic;
            link.value = lesson.link;
            note.value = lesson.Note;
        }
        const editStep = (step) => {
            lessonEdit.value = false;
            stepEdit.value = true;
            stepId.value = step.id;
            LessonId.value = step.LessonId;
            stepNo.value = step.StepNo;
            stepDescription.value = step.description;
        }
        const addMoreStep = () => {
            stepsAdd.value.push({ number: '', description: '' });
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
            loadSteps,
            steps,
            editStep,
            lessonId,
            moduleId,
            topic,
            link,
            note,
            editLesson,
            updateLesson,
            lessonEdit,
            stepEdit,
            modules,
            stepId,
            LessonId,
            stepNo,
            updateStep,
            stepDescription,
            topicName,
            linkName,
            noteName,
            stepsAdd,
            addMoreStep,
            addLesson
        }
    },
    name: 'AddLesson'
};
</script>