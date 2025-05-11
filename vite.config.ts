import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Автоматически выбираем base для dev и production
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/TaskBoard/' : '/',
  plugins: [react()],
})
