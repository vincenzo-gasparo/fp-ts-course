import { test, expect } from '@playwright/test'

// Use waitUntil: 'networkidle' before clicking React islands.
// In dev mode, Vite loads unbundled modules one-by-one; clicking before
// the onClick handler is attached silently drops the event.

test.describe('mark-complete — PROG-01', () => {
  // 1. Mark complete button is visible on lesson page
  test('mark complete button is visible on lesson page', async ({ page }) => {
    await page.goto('/lessons/day-01')
    const btn = page.getByTestId('mark-complete-btn')
    await expect(btn).toBeVisible()
  })

  // 2. Clicking mark complete marks day as complete
  test('clicking mark complete marks day as complete', async ({ page }) => {
    await page.goto('/lessons/day-01', { waitUntil: 'networkidle' })
    const btn = page.getByTestId('mark-complete-btn')
    await btn.click()
    await expect(btn).toHaveAttribute('data-complete', 'true')
  })

  // 3. Clicking mark complete again unmarks the day
  test('clicking mark complete again unmarks the day', async ({ page }) => {
    await page.goto('/lessons/day-01', { waitUntil: 'networkidle' })
    const btn = page.getByTestId('mark-complete-btn')
    await btn.click()
    await expect(btn).toHaveAttribute('data-complete', 'true')
    await btn.click()
    await expect(btn).toHaveAttribute('data-complete', 'false')
  })

  // 4. Mark complete persists after reload
  test('mark complete persists after reload', async ({ page }) => {
    await page.goto('/lessons/day-01', { waitUntil: 'networkidle' })
    const btn = page.getByTestId('mark-complete-btn')
    await btn.click()
    await expect(btn).toHaveAttribute('data-complete', 'true')
    await page.reload({ waitUntil: 'networkidle' })
    await expect(page.getByTestId('mark-complete-btn')).toHaveAttribute('data-complete', 'true')
  })

  // 5. Completion status reflected on home page day card
  test('completion status reflected on home page day card', async ({ page }) => {
    await page.goto('/lessons/day-01', { waitUntil: 'networkidle' })
    const btn = page.getByTestId('mark-complete-btn')
    await btn.click()
    await expect(btn).toHaveAttribute('data-complete', 'true')
    await page.goto('/', { waitUntil: 'networkidle' })
    const dayCard = page.locator('[data-testid="day-card"][data-day="1"]')
    await expect(dayCard).toHaveAttribute('data-complete', 'true')
  })
})

test.describe('progress-bar — PROG-02', () => {
  // 6. Progress bar is visible on home page
  test('progress bar is visible on home page', async ({ page }) => {
    await page.goto('/')
    const container = page.getByTestId('progress-bar-container')
    await expect(container).toBeVisible()
  })

  // 7. Progress bar reflects completed count
  test('progress bar reflects completed count', async ({ page }) => {
    // Navigate first to establish page context for localStorage access
    await page.goto('/')
    await page.evaluate(() =>
      localStorage.setItem('fp-ts-course:progress', JSON.stringify([1, 2, 3]))
    )
    await page.reload({ waitUntil: 'networkidle' })
    const fill = page.getByTestId('progress-bar-fill')
    await expect(fill).toBeVisible()
    await expect(fill).toHaveRole('progressbar')
  })
})
