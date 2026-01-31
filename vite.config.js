import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Polyfill "global" for SockJS compatibility
  define: {
    global: 'window'
  },

  server: {
    port: 5173,  // your frontend port
    open: true,  // automatically opens browser
    cors: true   // allow cross-origin requests
  }
});
