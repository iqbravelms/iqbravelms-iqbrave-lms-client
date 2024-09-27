<template>
    <div>
        <h1 v-if="loading">Loading...</h1>
        <div v-else-if="error">
            <h2>Error: {{ error }}</h2>
        </div>
        <div v-else class="p-24">
            <div
                class=" w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <button aria-current="true" type="button"
                    class="cursor-default w-full px-4 py-2 font-medium text-left rtl:text-right text-white bg-blue-700 border-b border-gray-200 rounded-t-lg focus:outline-none dark:bg-gray-800 dark:border-gray-600">
                    Modules : {{ moduleName }} <br> Topic : {{ data.topic }}
                </button>

                <div class="flex justify-center p-16">
                    <div class="relative w-full" style="padding-top: 56.25%;">
                        <iframe class="absolute top-0 left-0 w-full h-full border-0" :src="data.link"
                            title="YouTube Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
                <div class="p-12">
                    <ul class="text-base"><strong>Note : </strong>
                        <ul
                            class="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-default  bg-gray-100 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                            {{ data.Note }} </ul>
                    </ul>
                </div>


                <div class="pl-12 pb-12 pr-12">

                    <p class="text-base"><strong>Steps </strong></p>
                    <ul
                        class="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-default  bg-gray-100 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        <li v-for="(step, index) in data.steps" :key="step.step_id">
                            Step {{ index + 1 }}: {{ step.description }}
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'; // Import Axios
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const data = ref({}); // Initialize data as an object
        const loading = ref(true);
        const error = ref(null);
        const moduleName = localStorage.getItem('moduleName');

        const loadLesson = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const topicId = localStorage.getItem('topicId'); // Retrieve the topicId from localStorage
            try {
                const response = await axios.get(`http://localhost:8000/api/lesson/${topicId}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`  // Ensure token is present here
                    }
                });
                data.value = response.data.lesson; // Adjust based on your actual API response
                console.log(response.data);
            } catch (err) {
                error.value = err.message; // Set error message
                console.error(err); // Log the error for debugging
            } finally {
                loading.value = false; // Set loading to false after fetching
            }
        };

        onMounted(() => {
            loadLesson(); // Load lesson when the component is mounted
        });

        return {
            data,
            loading,
            error,
            moduleName,
        };
    },

    name: 'AppTopic',
}
</script>

<style scoped></style>
