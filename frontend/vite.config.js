import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    // 🟢 આ લાઈન ઉમેરવાથી public ફોલ્ડરમાં ઈમેજ પેસ્ટ કરવાથી સર્વર ક્રેશ નહીં થાય
    watch: {
      ignored: ['**/public/**'],
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
