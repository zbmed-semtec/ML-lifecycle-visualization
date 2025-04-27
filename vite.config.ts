import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      // Set the entry point
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MLLifecycleVisualization',
      // Proper extensions for the output files
      fileName: (format) => `ml-lifecycle-visualization.${format}.js`
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      external: ['vue'],
      output: {
        // Global variables to use in UMD build for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    },
    // Generate sourcemaps for easier debugging
    sourcemap: true,
    // Ensure CSS is inlined to work with shadow DOM
    cssCodeSplit: false,
    outDir: 'dist'
  },
  preview: {
    // Preview server will serve from build.outDir ('dist')
    // Open the example file automatically relative to the server root
    open: '/example/' 
  }
})
