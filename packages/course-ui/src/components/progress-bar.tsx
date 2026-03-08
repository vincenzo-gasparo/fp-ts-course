'use client'

import { useStore } from '@nanostores/react'
import { completedDaysStore } from '../lib/progress-store'

interface Props {
  total: number
}

export function ProgressBar({ total }: Props) {
  const completedDays = useStore(completedDaysStore)
  const completed = completedDays.size
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div data-testid="progress-bar-container" className="mb-8">
      <div className="mb-1 flex justify-between text-sm text-zinc-500">
        <span>{completed} of {total} days complete</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div
          data-testid="progress-bar-fill"
          role="progressbar"
          aria-valuenow={completed}
          aria-valuemin={0}
          aria-valuemax={total}
          style={{ width: `${pct}%` }}
          className="h-2 rounded-full bg-green-500 transition-all"
        />
      </div>
    </div>
  )
}
