import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-core';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer';
          }
          if (id.includes('node_modules/react-icons') || id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
        },
      },
    },
  },
})
