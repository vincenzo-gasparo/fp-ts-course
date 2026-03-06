'use client'

import { useProgress } from './progress-provider'

interface Props {
  day: number
}

export function MarkCompleteButton({ day }: Props) {
  const { isComplete, toggleDay } = useProgress()
  const done = isComplete(day)

  return (
    <button
      data-testid="mark-complete-btn"
      data-complete={done ? 'true' : 'false'}
      aria-pressed={done}
      onClick={() => toggleDay(day)}
      className={[
        'rounded-md px-4 py-2 text-sm font-medium transition-colors border',
        done
          ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800'
          : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-700',
      ].join(' ')}
    >
      {done ? 'Completed ✓' : 'Mark as complete'}
    </button>
  )
}
