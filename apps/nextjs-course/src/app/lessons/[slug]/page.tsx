import { lessons } from '.velite'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMDXComponent, Pre, Quiz, MarkCompleteButton, TableOfContents } from '@courses/ui'
import courseConfig from '../../../../course.config'

// REQUIRED for static export: every dynamic route must export generateStaticParams
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export function generateStaticParams() {
  return lessons.map((lesson) => ({
    slug: lesson.slug.split('/').pop()!,
  }))
}

// Optional: set page metadata from lesson frontmatter
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lesson = lessons.find((l) => l.slug.endsWith(slug))
  if (!lesson) return {}
  return {
    title: `Day ${lesson.day}: ${lesson.title} — ${courseConfig.title}`,
    description: lesson.description,
  }
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sorted = [...lessons].sort((a, b) => a.day - b.day)
  const idx = sorted.findIndex((l) => l.slug.endsWith(slug))
  if (idx === -1) notFound()

  const lesson = sorted[idx]
  const prev = sorted[idx - 1] ?? null
  const next = sorted[idx + 1] ?? null
  const MDXContent = getMDXComponent(lesson.body)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex gap-12">
        <TableOfContents />

        <div className="min-w-0 flex-1">
          <div className="mb-2 text-sm text-zinc-500">Day {lesson.day}</div>
          <h1 className="mb-8 text-3xl font-bold">{lesson.title}</h1>

          <article className="prose prose-zinc dark:prose-invert max-w-none">
            <MDXContent components={{ pre: Pre }} />
          </article>

          {lesson.quiz && lesson.quiz.length > 0 && (
            <Quiz items={lesson.quiz} />
          )}

          <div className="mt-8">
            <MarkCompleteButton day={lesson.day} />
          </div>

          <nav className="mt-12 flex justify-between border-t pt-6">
            {prev ? (
              <Link
                href={`/lessons/${prev.slug.split('/').pop()}`}
                className="flex flex-col gap-1"
                aria-label="Previous lesson"
              >
                <span className="text-xs text-zinc-500">Previous</span>
                <span className="text-sm font-medium">{prev.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/lessons/${next.slug.split('/').pop()}`}
                className="flex flex-col items-end gap-1"
                aria-label="Next lesson"
              >
                <span className="text-xs text-zinc-500">Next</span>
                <span className="text-sm font-medium">{next.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>

          <div className="mt-6">
            <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
              ← All lessons
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
