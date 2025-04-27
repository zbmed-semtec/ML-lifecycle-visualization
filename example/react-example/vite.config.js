import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   // This helps Vite work correctly with npm linked packages
  //   preserveSymlinks: true,
  // },
  // optimizeDeps: {
  //   // Explicitly include the linked dependency
  //   include: ['ml-lifecycle-visualization'],
  // },
  // Optional: Define a specific port if needed
  // server: {
  //   port: 3001 
  // }
}) 