import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

const base = process.env.CI ? '/astro-courses/' : '/'

export default defineConfig({
  output: 'static',
  base,
  vite: {
    plugins: [tailwindcss()],
  },
})
