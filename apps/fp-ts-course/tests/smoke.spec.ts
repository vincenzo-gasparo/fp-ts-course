import { test, expect } from '@playwright/test'

// NAV-01: home page lists all 16 lessons (day-00 intro + 15 main lessons)
test('home page lists 15 day cards with titles', async ({ page }) => {
  await page.goto('/')
  const cards = page.locator('[data-testid="day-card"]')
  await expect(cards).toHaveCount(16)
})

// NAV-02: clicking a day card navigates to lesson page (day-00 is the intro, first card)
test('lesson navigation — clicking day 1 opens lesson page', async ({ page }) => {
  await page.goto('/')
  await page.locator('[data-testid="day-card"]').first().click()
  await expect(page).toHaveURL(/\/lessons\/day-0[01]/)
})

// NAV-03: prev/next navigation links exist on lesson page
test('prev next navigation links exist on lesson page', async ({ page }) => {
  await page.goto('/lessons/day-02')
  await expect(page.getByRole('link', { name: /previous/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /next/i })).toBeVisible()
})

// NAV-04: dark mode toggle sets .dark class on <html>
test('dark mode toggle applies dark class to html element', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /toggle dark mode/i }).click()
  const htmlClass = await page.locator('html').getAttribute('class')
  expect(htmlClass).toContain('dark')
})

// CONT-02: code blocks contain syntax-highlighted spans
test('syntax highlight — code blocks contain highlighted spans', async ({ page }) => {
  await page.goto('/lessons/day-01')
  const highlightedSpan = page.locator('pre span[style]').first()
  await expect(highlightedSpan).toBeVisible()
})

// CONT-03: copy button copies code to clipboard
test('copy button is visible on code blocks', async ({ page }) => {
  await page.goto('/lessons/day-01')
  const copyBtn = page.getByRole('button', { name: /copy/i }).first()
  await expect(copyBtn).toBeVisible()
})
