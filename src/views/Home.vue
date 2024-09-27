<template>
  <div>
    <div class="relative overflow-hidden bg-cover bg-center bg-no-repeat p-12 text-center"
      style="background-image: url('img/carousel.png'); min-height: 600px; background-size: cover;">
      <div class="absolute inset-0 h-full w-full bg-black bg-opacity-60">
        <div class="flex h-full ml-36 mt-28">
          <div class="text-white float-left">
            <span id="heading" class="mb-4 text-8xl font-semibold"></span>
            <span id="headingsub" class="text-red-600 mb-4 text-6xl font-semibold"></span>
            <br />
            <span id="subheading" class="mb-6 text-6xl font-semibold"></span>
            <br />
            <button type="button"
              class="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200">
              Call to action
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card-container grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-16">
      <div v-for="course in courses" :key="course.id" class="p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ course.name }}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology
          acquisitions of 2021 so far, in reverse chronological order.</p>
        <button @click="goToModule(course.id, course.name)"
          class="clickmewithcourseid inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2 mt-1 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import Axios
import { ref, onMounted } from 'vue'; // Import necessary functions
import { useRouter } from 'vue-router'; // Import useRouter

export default {
  setup() {
    const courses = ref([]);
    const router = useRouter(); // Use useRouter to access the router

    // Load courses when the component is mounted
    onMounted(async () => {
      await loadCourses();
    });

    const loadCourses = async () => {
      try {
        // Load courses from the API
        const apiResponse = await axios.get('http://localhost:8000/api/courses', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });



        if (apiResponse.data.status === 'success' && apiResponse.data.courses.length > 0) {
          courses.value = apiResponse.data.courses; // Set the courses data
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const goToModule = (courseId, courseName) => {
      localStorage.setItem('courseId', courseId); // Store selected course ID in localStorage
      localStorage.setItem('courseName', courseName); // Store selected course ID in localStorage
      router.push({ name: 'Module' }); // Navigate to Module page using the router
    };

    return {
      courses,
      goToModule,
    };
  },
  name: 'HomePage',
};
</script>

<style scoped>
.card-container {
  padding: 20px;
}
</style>
