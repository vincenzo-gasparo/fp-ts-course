import type { Metadata } from 'next'
import { CourseLayout } from '@courses/ui'
import courseConfig from '../../course.config'
import './globals.css'

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
    <CourseLayout title={courseConfig.title} storageKey={courseConfig.storageKey}>
      {children}
    </CourseLayout>
  )
}
