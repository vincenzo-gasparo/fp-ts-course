import { defineConfig, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { extractRaw, attachRaw } from '@courses/ui/lib/velite-plugins'

const quizItem = s.object({
  question: s.string(),
  options: s.array(s.string()),
  correct: s.number(),
  explanation: s.string(),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6][ext]',
    clean: true,
    format: 'cjs',
  },
  collections: {
    lessons: {
      name: 'Lesson',
      pattern: 'lessons/day-*.mdx',
      schema: s.object({
        title: s.string(),
        day: s.number(),
        description: s.string().optional(),
        slug: s.path(),   // yields "lessons/day-01" etc.
        body: s.mdx(),
        quiz: s.array(quizItem).optional(),
      }),
    },
  },
  mdx: {
    rehypePlugins: [
      extractRaw,
      [rehypePrettyCode, { theme: 'one-dark-pro' }],
      attachRaw,
      rehypeSlug,
    ],
  },
})
