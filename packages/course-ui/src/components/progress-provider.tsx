'use client'

import { useEffect } from 'react'
import { completedDaysStore } from '../lib/progress-store'
import { loadProgress, saveProgress } from '../lib/progress'

interface Props {
  storageKey: string
}

export function ProgressInit({ storageKey }: Props) {
  useEffect(() => {
    completedDaysStore.set(loadProgress(storageKey))
    // listen() fires only on future changes, not immediately
    return completedDaysStore.listen((days) => {
      saveProgress(storageKey, days)
    })
  }, [storageKey])

  return null
}
