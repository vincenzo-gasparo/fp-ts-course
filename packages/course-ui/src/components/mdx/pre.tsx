import { CopyButton } from './copy-button'

// The `raw` prop is injected by the Velite rehype pipeline (attachRaw plugin in velite.config.ts).
// rehype-pretty-code wraps code blocks in <figure data-rehype-pretty-code-figure>,
// then the attachRaw visitor copies node.raw onto the inner <pre> element's properties.
export function Pre({ children, raw, ...props }: React.HTMLAttributes<HTMLPreElement> & { raw?: string }) {
  return (
    <pre {...props} className={`relative ${props.className ?? ''}`}>
      {raw && <CopyButton text={raw} />}
      {children}
    </pre>
  )
}
