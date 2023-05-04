import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    port: 3000,
    https: true
  },
  build: {
    outDir: '../Api/wwwroot',
    watch: {
      include: 'src/**'
    },
    emptyOutDir: true
  }
});
