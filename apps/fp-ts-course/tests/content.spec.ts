import { test, expect } from '@playwright/test'

test.describe('content — CONT-01', () => {
  // 1. day-01 lesson has substantial content (not a stub)
  test('day-01 lesson has substantial content (not a stub)', async ({ page }) => {
    await page.goto('/lessons/day-01')
    const text = await page.locator('article').innerText()
    expect(text.length).toBeGreaterThan(500)
  })

  // 2. day-08 lesson has substantial content (not a stub)
  test('day-08 lesson has substantial content (not a stub)', async ({ page }) => {
    await page.goto('/lessons/day-08')
    const text = await page.locator('article').innerText()
    expect(text.length).toBeGreaterThan(500)
  })

  // 3. day-15 lesson has substantial content (not a stub)
  test('day-15 lesson has substantial content (not a stub)', async ({ page }) => {
    await page.goto('/lessons/day-15')
    const text = await page.locator('article').innerText()
    expect(text.length).toBeGreaterThan(500)
  })

  // 4. day-01 lesson has a "When to use" section heading
  test('day-01 lesson has a When to use section', async ({ page }) => {
    await page.goto('/lessons/day-01')
    await expect(page.getByRole('heading', { name: /when to use/i })).toBeVisible()
  })

  // 5. day-01 lesson has a "Key Takeaways" section heading
  test('day-01 lesson has a Key Takeaways section', async ({ page }) => {
    await page.goto('/lessons/day-01')
    await expect(page.getByRole('heading', { name: /key takeaways/i })).toBeVisible()
  })
})
