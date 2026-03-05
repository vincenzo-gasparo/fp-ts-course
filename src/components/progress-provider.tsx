'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { loadProgress, saveProgress } from '@/lib/progress'

interface ProgressContextValue {
  completedDays: Set<number>
  toggleDay: (day: number) => void
  isComplete: (day: number) => boolean
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  // Start with empty Set (SSR-safe); hydrate from localStorage in useEffect
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set())

  useEffect(() => {
    setCompletedDays(loadProgress())
  }, [])

  const toggleDay = useCallback((day: number) => {
    setCompletedDays((prev) => {
      const next = new Set(prev)
      if (next.has(day)) {
        next.delete(day)
      } else {
        next.add(day)
      }
      saveProgress(next)
      return next
    })
  }, [])

  const isComplete = useCallback((day: number) => completedDays.has(day), [completedDays])

  const value = useMemo(
    () => ({ completedDays, toggleDay, isComplete }),
    [completedDays, toggleDay, isComplete]
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
