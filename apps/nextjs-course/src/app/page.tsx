import { lessons } from '.velite'
import { ProgressBar, DayCardList } from '@courses/ui'
import courseConfig from '../../course.config'

export default function Home() {
  const sorted = [...lessons].sort((a, b) => a.day - b.day)

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">{courseConfig.title}</h1>
      <p className="mb-8 text-zinc-500">{courseConfig.description}</p>
      <ProgressBar total={sorted.length} />
      <DayCardList lessons={sorted} />
    </main>
  )
}
