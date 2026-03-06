import Link from 'next/link'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from './theme-provider'
import { ThemeToggle } from './theme-toggle'
import { ProgressProvider } from './progress-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

interface Props {
  title: string
  storageKey: string
  children: React.ReactNode
}

export function CourseLayout({ title, storageKey, children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-900`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ProgressProvider storageKey={storageKey}>
            <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-zinc-900">
              <Link href="/" className="font-semibold text-lg">
                {title}
              </Link>
              <ThemeToggle />
            </header>
            {children}
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
