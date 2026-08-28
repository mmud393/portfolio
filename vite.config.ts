import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repository name for GitHub Pages project sites (https://USERNAME.github.io/REPO/).
// Override at build time with: VITE_BASE_PATH=/my-repo/ npm run build
const repoName = 'portfolio'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? process.env.VITE_BASE_PATH ?? `/${repoName}/` : '/',
  build: {
    // Keep image assets (including placeholder SVGs) as separate emitted
    // files rather than base64-inlined, so they stay trivially replaceable.
    assetsInlineLimit: 0,
  },
}))
