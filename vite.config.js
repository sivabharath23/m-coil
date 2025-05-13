import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 This makes the dev server listen on all local IPs
    port: 5173, // optional: default port
  },
});
