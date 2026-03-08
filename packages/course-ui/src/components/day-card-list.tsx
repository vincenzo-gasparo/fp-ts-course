'use client'

import { useStore } from '@nanostores/react'
import { completedDaysStore } from '../lib/progress-store'

interface Lesson {
  day: number
  slug: string
  title: string
  description?: string
}

interface Props {
  lessons: Lesson[]
}

export function DayCardList({ lessons }: Props) {
  const completedDays = useStore(completedDaysStore)

  return (
    <div className="grid gap-4">
      {lessons.map((lesson) => {
        const done = completedDays.has(lesson.day)
        return (
          <a
            key={lesson.day}
            href={`/lessons/${lesson.slug}`}
            data-testid="day-card"
            data-day={lesson.day}
            data-complete={done ? 'true' : 'false'}
            className="flex items-center gap-4 rounded-lg border p-4 transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            <span
              className={[
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-mono font-semibold',
                done
                  ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                  : 'bg-zinc-100 dark:bg-zinc-800',
              ].join(' ')}
            >
              {done ? '✓' : String(lesson.day).padStart(2, '0')}
            </span>
            <div>
              <div className="font-medium">{lesson.title}</div>
              {lesson.description && (
                <div className="text-sm text-zinc-500">{lesson.description}</div>
              )}
            </div>
          </a>
        )
      })}
    </div>
  )
}
