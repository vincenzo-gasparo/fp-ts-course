import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { CourseLayout } from '@courses/ui'
import courseConfig from '../../course.config'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: courseConfig.title,
  description: courseConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CourseLayout
      title={courseConfig.title}
      storageKey={courseConfig.storageKey}
      fontClassName={`${geistSans.variable} ${geistMono.variable}`}
    >
      {children}
    </CourseLayout>
  )
}
