'use client'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      className="rounded-md border px-3 py-1.5 text-sm"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
