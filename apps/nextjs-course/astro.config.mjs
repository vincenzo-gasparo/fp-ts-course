import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import expressiveCode from 'astro-expressive-code'
import { courseIntegration } from '@courses/ui'
import courseConfig from './course.config'

const base = process.env.CI ? '/astro-courses/nextjs-course/' : '/'

export default defineConfig({
  output: 'static',
  base,
  integrations: [
    courseIntegration(courseConfig),
    expressiveCode({
      themes: ['one-dark-pro'],
    }),
    mdx(),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
