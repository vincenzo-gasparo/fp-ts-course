import { visit } from 'unist-util-visit'

// Pass 1: extract raw text before Shiki transforms
export const extractRaw = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      const [codeEl] = node.children
      if (codeEl?.tagName !== 'code') return
      node.raw = codeEl.children?.[0]?.value ?? ''
    }
  })
}

// Pass 2: re-attach raw after Shiki wraps nodes in <figure data-rehype-pretty-code-figure>
export const attachRaw = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === 'element' && node?.tagName === 'figure') {
      if (!('data-rehype-pretty-code-figure' in (node.properties ?? {}))) return
      const preEl = node.children?.find((n: any) => n.tagName === 'pre')
      if (preEl) preEl.properties['raw'] = node.raw
    }
  })
}
