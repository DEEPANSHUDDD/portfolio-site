import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// CHANGE THIS ⬇️ to your GitHub repo name
const repoName = 'portfolio-site'  // <-- example, change if yours is different

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,   // 👈 this fixes GitHub Pages blank page

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
})
