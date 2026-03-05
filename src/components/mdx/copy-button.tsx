'use client'
import { useState } from 'react'

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className="absolute right-2 top-2 rounded px-2 py-1 text-xs text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}
