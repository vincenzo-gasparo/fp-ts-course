'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <button className="rounded-md border px-3 py-1.5 text-sm opacity-0" aria-hidden>Dark</button>

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      className="rounded-md border px-3 py-1.5 text-sm"
    >
      {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
