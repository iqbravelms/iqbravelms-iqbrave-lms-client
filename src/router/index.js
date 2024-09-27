import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';  // Import Signup view
import Module from '@/views/Module.vue';  // Import Module view
import Dashboard from '@/views/Dashboard.vue';  // Import Dashboard view
import LessonTopic from '@/views/LessonTopic.vue';  // Import Lesson view
import WatchLesson from '@/views/WatchLesson.vue';  // Import Lesson view

const routes = [
  { path: '/', component: Home, name: 'Home' },  // Home route
  { path: '/login', component: Login, name: 'Login' },  // Login route
  { path: '/signup', component: Signup, name: 'Signup' },  // Signup route
  { path: '/module', component: Module, name: 'Module' },  // Module route
  { path: '/dashboard', component: Dashboard, name: 'Dashboard', meta: { requiresAuth: true } },  // Dashboard route (requires auth)
  { path: '/topic', component: LessonTopic, name: 'LessonTopic', meta: { requiresAuth: true } },  // Lesson route (requires auth)
  { path: '/lession', component: WatchLesson, name: 'WatchLesson', meta: { requiresAuth: true } }  // Lesson route (requires auth)
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');  // Get token from localStorage
  const isAuthenticated = !!token;  // Check if token exists (user is authenticated)

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Redirect to login if the route requires authentication and user is not authenticated
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isAuthenticated) {
    // Prevent already logged-in user from accessing login page
    next({ name: 'Home' });  // Redirect to Dashboard or another protected page
  } else {
    // Proceed to the requested route
    next();
  }
});


export default router;
