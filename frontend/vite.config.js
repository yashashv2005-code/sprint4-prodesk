import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Convenience for local dev (avoid CORS issues)
      '/generate': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  }
});

