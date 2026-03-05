import { lessons } from '.velite'
import Link from 'next/link'

export default function Home() {
  const sorted = [...lessons].sort((a, b) => a.day - b.day)

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">fp-ts Course</h1>
      <p className="mb-8 text-zinc-500">15 structured days to confident functional TypeScript.</p>
      <div className="grid gap-4">
        {sorted.map((lesson) => {
          const slug = lesson.slug.split('/').pop()!
          return (
            <Link
              key={lesson.day}
              href={`/lessons/${slug}`}
              data-testid="day-card"
              className="flex items-center gap-4 rounded-lg border p-4 transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-mono font-semibold dark:bg-zinc-800">
                {String(lesson.day).padStart(2, '0')}
              </span>
              <div>
                <div className="font-medium">{lesson.title}</div>
                {lesson.description && (
                  <div className="text-sm text-zinc-500">{lesson.description}</div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
