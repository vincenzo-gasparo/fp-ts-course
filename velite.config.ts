import { defineConfig, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'
import { visit } from 'unist-util-visit'

// Pass 1: extract raw text before Shiki transforms
const extractRaw = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      const [codeEl] = node.children
      if (codeEl?.tagName !== 'code') return
      node.raw = codeEl.children?.[0]?.value ?? ''
    }
  })
}

// Pass 2: re-attach raw after Shiki wraps nodes in <figure data-rehype-pretty-code-figure>
const attachRaw = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === 'element' && node?.tagName === 'figure') {
      if (!('data-rehype-pretty-code-figure' in (node.properties ?? {}))) return
      const preEl = node.children?.find((n: any) => n.tagName === 'pre')
      if (preEl) preEl.properties['raw'] = node.raw
    }
  })
}

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
      }),
    },
  },
  mdx: {
    rehypePlugins: [
      extractRaw,
      [rehypePrettyCode, { theme: 'one-dark-pro' }],
      attachRaw,
    ],
  },
})
