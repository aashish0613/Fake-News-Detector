import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Add this line

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()], // <-- Add tailwindcss() here
})