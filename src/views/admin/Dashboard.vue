<template>
  <div class="flex bg-gray-100 relative">
    <!-- Sidebar for large screens -->
    <aside
      :class="['fixed inset-y-0 left-0 w-64 bg-black text-white transform z-50', sidebarOpen ? 'translate-x-0' : '-translate-x-full', 'transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0']"
      @click.stop>
      <div class="p-4 text-center text-2xl font-bold mb-4">Admin Panel</div>
      <nav class="mt-10 mb-8">
        <router-link to="/register" class="block px-4 py-2 hover:bg-blue-700">Admin Registration</router-link>
        <router-link to="/students" class="block px-4 py-2 hover:bg-blue-700">View Students</router-link>
        <router-link to="/course" class="block px-4 py-2 hover:bg-blue-700">Course</router-link>
        <router-link to="/addmodule" class="block px-4 py-2 hover:bg-blue-700">Module</router-link>
        <router-link to="/addlesson" class="block px-4 py-2 hover:bg-blue-700">Lesson</router-link>
      </nav>
    </aside>

    <!-- Main Content Overlay (detects outside clicks) -->
    <div class="flex-1 relative z-10" @click="closeSidebarOnClickOutside">
      <!-- Mobile menu button -->
      <button class="lg:hidden p-2 rounded-md text-gray-500 hover:text-white hover:bg-gray-700"
        @click.stop="toggleSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Page Content -->
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    closeSidebarOnClickOutside(event) {
      const clickedOutside = !event.target.closest('aside'); // Detect if the click was outside the sidebar
      if (this.sidebarOpen && clickedOutside) {
        this.sidebarOpen = false;
      }
    },
  },
  name: 'AdminDashboard'
};
</script>

<style scoped></style>
