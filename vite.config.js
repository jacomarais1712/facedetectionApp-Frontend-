import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createProxyMiddleware } from 'http-proxy-middleware'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/backend': {
        target: 'https://facedetectionappbackend.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ''),
        secure: false,
      },
    },
  },
});
