import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    sourcemap: false
  },
  envDir: 'envs',
  preview: {
    allowedHosts: ['YOUR_FUCKING_DOMAIN'],
    host: '0.0.0.0',
    port: 8585 // ❤️👙👙❤️
  },
  server: {
    allowedHosts: ['*'],
    host: '0.0.0.0',
    hmr: false,
    port: 8585 // ❤️👙👙❤️
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url))
    }
  }
})
