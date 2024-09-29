<template>
    <div>
        <h1 v-if="loading">Loading...</h1>
        <div v-else-if="error">
            <h2>Error: {{ error }}</h2>
        </div>
        <div v-else class="p-6 md:p-12 lg:p-24">
            <div
                class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <button aria-current="true" type="button"
                    class="cursor-default w-full px-4 py-2 font-medium text-left rtl:text-right text-white bg-blue-700 border-b border-gray-200 rounded-t-lg focus:outline-none dark:bg-gray-800 dark:border-gray-600">
                    Modules: {{ moduleName }} <br> Topic: {{ data.topic }}
                </button>

                <!-- Responsive Video Section -->
                <div class="flex justify-center p-6 md:p-16">
                    <div class="relative w-full" style="padding-top: 56.25%;">
                        <iframe v-if="data.link" class="absolute top-0 left-0 w-full h-full border-0" :src="data.link"
                            title="YouTube Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>

                <!-- Responsive Notes Section -->
                <div class="p-6 md:p-12">
                    <ul class="text-base"><strong>Note:</strong>
                        <ul
                            class="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-default bg-gray-100 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                            {{ data.Note }}
                        </ul>
                    </ul>
                </div>

                <!-- Responsive Steps Section -->
                <div class="px-6 pb-6 pr-6 md:px-12 md:pb-12 md:pr-12">
                    <p class="text-base"><strong>Steps</strong></p>
                    <ul
                        class="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-default bg-gray-100 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        <li v-for="(step, index) in data.steps" :key="step.step_id">
                            Step {{ index + 1 }}: {{ step.description }}
                        </li>
                    </ul>
                </div>

                <!-- Assignment Section -->
                <div class="px-6 pb-6 pr-6 md:px-12 md:pb-12 md:pr-12">
                    <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow cursor-default">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Assignment
                            Section</h5>
                        <button v-if="showAssignmentButton" type="button"
                            class="w-full md:w-auto text-white hover:text-white border bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5 text-center me-2 mb-2"
                            @click.prevent="getAssignments(data.id)">I want Assignment</button>
                        <div v-if="loadingAssignment">Loading assignments...</div>
                        <div v-else-if="errorAssignment">
                            <h2>Error: {{ errorAssignment }}</h2>
                        </div>
                        <div v-else class="p-6 md:p-12">
                            <div v-if="assignments && assignments.length">
                                <div v-for="(assignment, index) in assignments" :key="assignment.assignment_id"
                                    class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow cursor-default mt-4">
                                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Assignment {{ index + 1 }}</h3>

                                    <!-- Responsive Assignment Dates -->
                                    <div class="flex flex-col md:flex-row justify-between mb-4">
                                        <h3 class="text-lg font-semibold text-green-400">
                                            StartDate: {{ assignment.student_assignments.length > 0 ?
                                                assignment.student_assignments[0].StartDate : 'No Start Date Available' }}
                                        </h3>
                                        <h3 class="text-lg font-semibold text-right text-red-400">
                                            DueDate: {{ assignment.student_assignments.length > 0 ?
                                                assignment.student_assignments[0].DueDate : 'No Due Date Available' }}
                                        </h3>
                                    </div>
                                    <hr>
                                    <br>

                                    <!-- Responsive Download Structure Section -->
                                    <div class="flex flex-col md:flex-row justify-between items-center mb-4">
                                        <p class="text-gray-700 font-medium"><strong>Download structure:</strong></p>
                                        <div class="flex space-x-4">
                                            <a v-if="extractDriveId(assignment.structure)"
                                                :href="'https://drive.google.com/uc?export=download&id=' + extractDriveId(assignment.structure)"
                                                download
                                                class="text-white w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5">
                                                Download File
                                            </a>
                                            <a :href="assignment.structure" target="_blank"
                                                class="text-white w-full md:w-auto bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5">
                                                Open File
                                            </a>
                                        </div>
                                    </div>
                                    <hr>

                                    <!-- Assignment Files Section -->
                                    <div class="mt-4">
                                        <h4 class="text-lg font-semibold text-gray-800 mb-3">Additional Files:</h4>
                                        <ul class="space-y-4">
                                            <li v-for="file in assignment.files" :key="file.file_id"
                                                class="flex justify-between items-center">
                                                <p class="text-gray-700 font-medium"><strong>File Name:</strong> {{
                                                    file.AssignmentName }}</p>

                                                <!-- File Download Link -->
                                                <div class="flex space-x-4">
                                                    <a v-if="extractDriveId(file.Link)"
                                                        :href="'https://drive.google.com/uc?export=download&id=' + extractDriveId(file.Link)"
                                                        download
                                                        class="text-white w-full md:w-auto bg-yellow-400 hover:bg-blue-500 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5">
                                                        Download File
                                                    </a>
                                                    <a :href="file.Link" target="_blank"
                                                        class="text-white w-full md:w-auto bg-blue-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5">
                                                        Open File
                                                    </a>

                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <br>
                                    <hr>
                                    <br>

                                    <!-- Submit Assignment Section -->
                                    <form
                                        @submit.prevent="submitAssignment(assignment.student_assignments[0].AssignmentFileId)">
                                        <div class="flex flex-col md:flex-row items-center justify-between">
                                            <!-- Label on the left -->
                                            <label for="DriveLink"
                                                class="block text-sm font-medium leading-6 text-gray-900 text-left">
                                                DriveLink
                                            </label>

                                            <!-- Textbox centered -->
                                            <div class="flex-1 mx-4 w-full">
                                                <input id="driveLink" v-model="driveLink" name="driveLink" type="text"
                                                    required
                                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                                    placeholder="Enter your google drive link" />
                                            </div>

                                            <!-- Button on the right -->
                                            <button type="submit"
                                                class="text-white w-full md:w-auto bg-green-400 hover:bg-blue-500 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5">
                                                Submit Assignment
                                            </button>
                                        </div>
                                    </form>


                                </div>
                            </div>
                            <div v-else>
                                <h2>No assignments available</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import axios from 'axios'; // Import Axios
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const data = ref({});
        const assignments = ref([]);
        const loading = ref(true);
        const loadingAssignment = ref(false);
        const error = ref(null);
        const router = useRouter();
        const errorAssignment = ref(null);
        const moduleName = localStorage.getItem('moduleName');
        const token = localStorage.getItem('token');
        const showAssignmentButton = ref(true);
        const driveLink = ref('');
        const loadingAssignmentSubmit = ref(false); // Define loading state
        const errorAssignmentSubmit = ref(null); // Define error state


        const submitAssignment = async (id) => {
            loadingAssignmentSubmit.value = true;
            try {
                const data = new URLSearchParams();
                data.append('assignmentId', id);
                console.log(driveLink.value);
                data.append('driveLink', driveLink.value);

                const response = await axios.post('http://localhost:8000/api/submitassignment', data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
            } catch (err) {
                console.log(err);
                errorAssignmentSubmit.value = err.response ? err.response.data.message : err.message;
            } finally {
                loadingAssignmentSubmit.value = false;
            }
        };
        const loadLesson = async () => {
            const topicId = localStorage.getItem('topicId');
            try {
                const response = await axios.get(`http://localhost:8000/api/lesson/${topicId}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`
                    }
                });
                data.value = response.data.lesson;
            } catch (err) {
                router.push({ name: 'Login' });
                localStorage.removeItem('token');
                error.value = err.response ? err.response.data.message : err.message;
            } finally {
                loading.value = false;
            }
        };

        const getAssignments = async (lessonId) => {
            loadingAssignment.value = true;
            errorAssignment.value = null;
            try {
                const response = await axios.get(`http://localhost:8000/api/assignments/${lessonId}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`
                    }
                });
                assignments.value = response.data.assignments;
                console.log(response.data);
                showAssignmentButton.value = false;
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    router.push({ name: 'Login' });  // Redirect to login if unauthorized
                    localStorage.removeItem('token'); // Remove the invalid token
                }
                errorAssignment.value = err.response ? err.response.data.message : err.message;
            } finally {
                loadingAssignment.value = false;
            }
        };

        // Function to extract Google Drive file ID from the URL
        const extractDriveId = (url) => {
            const regex = /\/d\/(.*?)\//;
            const match = url ? url.match(regex) : null;
            return match ? match[1] : '';
        };

        onMounted(() => {
            loadLesson();
        });

        return {
            data,
            assignments,
            loading,
            error,
            moduleName,
            loadingAssignment,
            errorAssignment,
            token,
            getAssignments,
            submitAssignment,
            showAssignmentButton,
            driveLink,
            extractDriveId // Return the function to use it in the template
        };
    },
    name: 'AppTopic',
};
</script>

<style scoped>
/* Your styles here */
</style>
