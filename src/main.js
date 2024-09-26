import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Import the router
import './tailwind.css';
const app = createApp(App);

app.use(router);  // Use the router in the app
app.mount('#app');  // Mount the app
