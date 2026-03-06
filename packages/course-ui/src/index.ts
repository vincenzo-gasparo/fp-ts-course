// Layout
export { CourseLayout } from './components/course-layout'

// Providers & hooks
export { ProgressProvider, useProgress } from './components/progress-provider'
export { ThemeProvider } from './components/theme-provider'
export { ThemeToggle } from './components/theme-toggle'

// Progress UI
export { MarkCompleteButton } from './components/mark-complete-button'
export { ProgressBar } from './components/progress-bar'
export { DayCardList } from './components/day-card-list'

// Navigation
export { TableOfContents } from './components/table-of-contents'

// MDX
export { Quiz } from './components/mdx/quiz'
export { Pre } from './components/mdx/pre'
export { CopyButton } from './components/mdx/copy-button'

// Lib
export { useMDXComponent } from './lib/mdx'
export { loadProgress, saveProgress } from './lib/progress'
export { cn } from './lib/utils'
