import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';


export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')  // Alias for src directory
    }
  },server: {
    hmr: false,  // Disable HMR if issues arise
  },
  plugins: [vue()]
});
