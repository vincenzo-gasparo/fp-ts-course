// Source: https://velite.js.org/guide/using-mdx
import * as runtime from 'react/jsx-runtime'

export function useMDXComponent(code: string) {
  const fn = new Function(code)
  return fn({ ...runtime }).default as React.ComponentType<{ components?: Record<string, React.ComponentType<any>> }>
}
