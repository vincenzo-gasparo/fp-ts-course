/**
 * Reads the set of completed day numbers from localStorage.
 * Returns an empty Set if:
 *   - running on the server (typeof window === 'undefined')
 *   - the key is not present
 *   - the stored value is malformed JSON
 */
export function loadProgress(storageKey: string): Set<number> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return new Set()
    const parsed: number[] = JSON.parse(raw)
    return new Set(parsed)
  } catch {
    return new Set()
  }
}

/**
 * Persists the set of completed day numbers to localStorage as a JSON array.
 * Does nothing when running on the server (typeof window === 'undefined').
 */
export function saveProgress(storageKey: string, days: Set<number>): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(storageKey, JSON.stringify([...days]))
}
