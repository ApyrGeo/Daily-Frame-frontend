import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server:{
   proxy:{
      '/api':{
        //target: "https://daily-frame-4a2df07f4319.herokuapp.com",
        //target: "http://localhost:5000",
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, "/api"),
      }
    }
  }
})
