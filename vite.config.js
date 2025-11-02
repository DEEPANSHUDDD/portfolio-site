import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// CHANGE THIS ⬇️ to your GitHub repo name
  // <-- example, change if yours is different

export default defineConfig({
  plugins: [react()],
  base: '/portfolio-site/',

  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    hmr: {
      clientPort: 443,
      protocol: 'wss',
      host: process.env.REPLIT_DEV_DOMAIN || 'localhost',
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei', 'maath'],
          'motion-vendor': ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
})
