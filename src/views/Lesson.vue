<template>
    <div>
        <div v-if="loading">Loading module...</div>
        <div v-if="error" class="error">Error loading module: {{ error }}</div>

        <div v-if="lessons && lessons.length">
            <ul class="p-24">


                <div
                    class=" w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <button aria-current="true" type="button"
                        class="cursor-default w-full px-4 py-2 font-medium text-left rtl:text-right text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600">
                        Modules : {{ moduleName }}
                    </button>
                    <button v-for="lesson in lessons" :key="lesson.id" @click="goToLesson(lesson.id)" type="button"
                        class="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        {{ lesson.topic }}
                    </button>
                </div>


            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'; // Import Axios
import { ref, onMounted } from 'vue'; // Import necessary functions
export default {
    setup() {
        const lessons = ref([]);
        const loading = ref(true);
        const error = ref(null);
        const moduleName = localStorage.getItem('moduleName');

        const loadLessons = async () => {
            const moduleId = localStorage.getItem('moduleId'); // Retrieve the courseId from localStorage
            // Retrieve the courseId from localStorage
            try {
                const response = await axios.get(`http://localhost:8000/api/lessons/${moduleId}`);
                lessons.value = response.data.lessons; // Adjust based on your actual API response
                console.log(response.data)
            } catch (err) {
                error.value = err.message; // Set error message
            } finally {
                loading.value = false; // Set loading to false after fetching
            }
        };
        onMounted(() => {
            loadLessons(); // Load modules when the component is mounted
        });
        return {
            lessons,
            loading,
            error,
            moduleName,
        };
    },

    name: 'AppLesson',
}
</script>

<style scoped>
/* Add your styles here */
</style>