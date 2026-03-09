import { describe, it, expect, beforeEach, vi } from 'vitest'
import { loadProgress, saveProgress } from './progress'

const STORAGE_KEY = 'fp-ts-course:progress'

// Mock localStorage for node environment
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

beforeEach(() => {
  localStorageMock.clear()
  vi.stubGlobal('localStorage', localStorageMock)
  vi.stubGlobal('window', { localStorage: localStorageMock })
})

describe('loadProgress()', () => {
  it('returns empty Set when localStorage has no key', () => {
    const result = loadProgress(STORAGE_KEY)
    expect(result).toBeInstanceOf(Set)
    expect(result.size).toBe(0)
  })

  it('returns Set containing parsed numbers when stored value is valid JSON array', () => {
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify([1, 2, 3]))
    const result = loadProgress(STORAGE_KEY)
    expect(result).toBeInstanceOf(Set)
    expect(result.has(1)).toBe(true)
    expect(result.has(2)).toBe(true)
    expect(result.has(3)).toBe(true)
    expect(result.size).toBe(3)
  })

  it('returns empty Set when localStorage has malformed JSON (no throw)', () => {
    localStorageMock.setItem(STORAGE_KEY, 'not-valid-json{{{')
    const result = loadProgress(STORAGE_KEY)
    expect(result).toBeInstanceOf(Set)
    expect(result.size).toBe(0)
  })

  it('returns empty Set when stored value is an empty array', () => {
    localStorageMock.setItem(STORAGE_KEY, '[]')
    const result = loadProgress(STORAGE_KEY)
    expect(result).toBeInstanceOf(Set)
    expect(result.size).toBe(0)
  })

  it('returns empty Set when window is undefined (SSR guard)', () => {
    vi.stubGlobal('window', undefined)
    const result = loadProgress(STORAGE_KEY)
    expect(result).toBeInstanceOf(Set)
    expect(result.size).toBe(0)
  })
})

describe('saveProgress()', () => {
  it('writes JSON array under storage key', () => {
    saveProgress(STORAGE_KEY, new Set([1, 2]))
    const stored = localStorageMock.getItem(STORAGE_KEY)
    expect(stored).not.toBeNull()
    const parsed = JSON.parse(stored!)
    expect(parsed).toContain(1)
    expect(parsed).toContain(2)
    expect(parsed).toHaveLength(2)
  })

  it('writes "[]" for empty Set', () => {
    saveProgress(STORAGE_KEY, new Set())
    const stored = localStorageMock.getItem(STORAGE_KEY)
    expect(stored).toBe('[]')
  })

  it('does nothing (no throw) when window is undefined (SSR guard)', () => {
    vi.stubGlobal('window', undefined)
    expect(() => saveProgress(STORAGE_KEY, new Set([1, 2]))).not.toThrow()
    // Nothing was written since window is undefined
    const stored = localStorageMock.getItem(STORAGE_KEY)
    expect(stored).toBeNull()
  })
})
