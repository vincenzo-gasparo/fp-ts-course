import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@courses/ui/lib/progress': path.resolve(__dirname, '../../packages/course-ui/src/lib/progress.ts'),
      '@courses/ui': path.resolve(__dirname, '../../packages/course-ui/src/index.ts'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
  },
})
