import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';  // Make sure this is imported
import Module from '@/views/Module.vue'; // Import the Module component
import Dashboard from '@/views/Dashboard.vue';

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/login', component: Login, name: 'Login' },  // Login route
  { path: '/signup', component: Signup, name: 'Signup' },  // Signup route
  { path: '/module', component: Module, name: 'Module' },
  { path: '/dashboard', component: Dashboard, name: 'Dashboard', meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard to protect dashboard route
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ name: 'Login' });  // Redirect to login if not authenticated
  } else {
    next();  // Proceed to the requested route
  }
});

export default router;
