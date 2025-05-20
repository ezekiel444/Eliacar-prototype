import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'Eliacar-prototype' with your actual repository name
export default defineConfig({
  base: '/Eliacar-prototype/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
