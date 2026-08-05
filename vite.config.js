import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/hotel-maluri-reporting-suite/',
  server: {
    port: 3000,
    open: true
  }
});
