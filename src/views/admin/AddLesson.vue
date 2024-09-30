<template>
    <div class="max-w-6xl mx-auto bg-white shadow p-6 rounded-lg w-full">
        <h2 class="text-2xl font-bold mb-6">Add Lesson</h2>
        <label for="" class="text-xl font-bold mb-6">Course :</label>
        <select name="" id="" class="text-xl  mb-6">
            <option value="">Select Course</option>
        </select>
        <br>
        <label for="" class="text-xl font-bold mb-6">Module :</label>
        <select name="" id="" class="text-xl  mb-6">
            <option value="">Select Courses</option>
        </select>

        <!-- Responsive Table Wrapper -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <label for="" class="text-xl font-bold mb-6">database lessons :</label>
            <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Product name</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Color</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Category</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Price</th>
                        <th scope="col" colspan="3" class="px-2 sm:px-4 py-2 sm:py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-2 sm:px-4 py-4 font-medium text-gray-900 dark:text-white">Apple
                            MacBook Pro 17"</th>
                        <td class="px-2 sm:px-4 py-4">Silver</td>
                        <td class="px-2 sm:px-4 py-4">Laptop</td>
                        <td class="px-2 sm:px-4 py-4">$2999</td>
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
            <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Product name</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Color</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Category</th>
                        <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3">Price</th>
                        <th scope="col" colspan="3" class="px-2 sm:px-4 py-2 sm:py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-2 sm:px-4 py-4 font-medium text-gray-900 dark:text-white">Apple
                            MacBook Pro 17"</th>
                        <td class="px-2 sm:px-4 py-4">Silver</td>
                        <td class="px-2 sm:px-4 py-4">Laptop</td>
                        <td class="px-2 sm:px-4 py-4">$2999</td>
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
export default {
    data() {
        return {
            steps: [''],
        };
    },
    methods: {
        addStep() {
            this.steps.push(''); // Push an empty string to represent a new step
        },
    },
    name: 'AddLesson'
};
</script>