import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this at /shishka-botanic-menu/, but keep local dev at root
  base: command === 'build' ? '/shishka-botanic-menu/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
  },
}))
