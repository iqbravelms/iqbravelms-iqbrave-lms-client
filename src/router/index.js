import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';  // Import Signup view
import Module from '@/views/Module.vue';  // Import Module view
import Dashboard from '@/views/Dashboard.vue';  // Import Dashboard view
import LessonTopic from '@/views/LessonTopic.vue';  // Import Lesson Topic view
import WatchLesson from '@/views/WatchLesson.vue';  // Import Watch Lesson view
import AdminDashboard from '@/views/admin/Dashboard.vue';  // Import Admin Dashboard view
import AdminRegister from '@/views/admin/AdminRegister.vue';
import ViewStudents from '@/views/admin/ViewStudents.vue';
const routes = [
  { path: '/', component: Home, name: 'Home' },  // Home route
  { path: '/login', component: Login, name: 'Login' },  // Login route
  { path: '/signup', component: Signup, name: 'Signup' },  // Signup route
  { path: '/module', component: Module, name: 'Module' },  // Module route
  { path: '/dashboard', component: Dashboard, name: 'Dashboard', meta: { requiresAuth: true } },  // Dashboard route (requires auth)
  { path: '/topic', component: LessonTopic, name: 'LessonTopic', meta: { requiresAuth: true } },  // Lesson Topic route (requires auth)
  { path: '/lesson', component: WatchLesson, name: 'WatchLesson', meta: { requiresAuth: true } },  // Watch Lesson route (requires auth)
  { path: '/admindashboard', component: AdminDashboard, name: 'AdminDashboard', meta: { requiresAuth: true },
  children: [
    { path: '/register', component: AdminRegister },
    { path: '/students', component: ViewStudents },
  ] }  // Admin Dashboard route (requires auth)
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  let userRole = null;
  if (token) {
    try {
      userRole = JSON.parse(atob(token.split('.')[1]))?.data?.role || null;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }


  // Check authentication and authorization
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Home' });
  } else if (to.name === 'AdminDashboard' && userRole !== 'admin') {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
