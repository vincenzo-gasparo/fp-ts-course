import { test, expect } from '@playwright/test'

test.describe('quiz — EXER-01', () => {
  // 1. Quiz section is visible on lesson page
  test('quiz is visible on lesson page', async ({ page }) => {
    await page.goto('/lessons/day-01')
    const quizSection = page.locator('section[aria-label="Quiz"]')
    await expect(quizSection).toBeVisible()
  })

  // 2. Clicking correct answer highlights it green (data-variant="correct")
  test('clicking correct answer highlights it green', async ({ page }) => {
    await page.goto('/lessons/day-01')
    const quizSection = page.locator('section[aria-label="Quiz"]')
    // Scope to the first question div to avoid strict-mode violation (3 questions = 3 correct buttons)
    const firstQuestion = quizSection.locator('div').first()
    const correctBtn = firstQuestion.locator('button[data-correct="true"]')
    await correctBtn.click()
    await expect(correctBtn).toHaveAttribute('data-variant', 'correct')
  })

  // 3. Clicking wrong answer highlights it red (data-variant="wrong")
  test('clicking wrong answer highlights it red', async ({ page }) => {
    await page.goto('/lessons/day-01')
    const quizSection = page.locator('section[aria-label="Quiz"]')
    const wrongBtn = quizSection.locator('button[data-correct="false"]').first()
    await wrongBtn.click()
    await expect(wrongBtn).toHaveAttribute('data-variant', 'wrong')
  })

  // 4. Correct option is revealed (data-variant="correct") when a wrong answer is chosen
  test('correct option is revealed when wrong answer is chosen', async ({ page }) => {
    await page.goto('/lessons/day-01')
    const quizSection = page.locator('section[aria-label="Quiz"]')
    // Scope to the first question div to avoid strict-mode violation (3 questions = 3 correct buttons)
    const firstQuestion = quizSection.locator('div').first()
    const wrongBtn = firstQuestion.locator('button[data-correct="false"]').first()
    await wrongBtn.click()
    const correctBtn = firstQuestion.locator('button[data-correct="true"]')
    await expect(correctBtn).toHaveAttribute('data-variant', 'correct')
  })

  // 5. Explanation text appears after answering
  test('explanation text appears after answering', async ({ page }) => {
    await page.goto('/lessons/day-01')
    const quizSection = page.locator('section[aria-label="Quiz"]')
    const anyOptionBtn = quizSection.locator('button[data-correct]').first()
    await anyOptionBtn.click()
    // Explanation paragraph should be non-empty
    const explanation = quizSection.locator('p[data-testid="explanation"]')
    const text = await explanation.innerText()
    expect(text.trim().length).toBeGreaterThan(0)
  })

  // 6. Answer is locked after first click — second click has no effect
  test('answer is locked after first click — second click has no effect', async ({ page }) => {
    await page.goto('/lessons/day-01')
    const quizSection = page.locator('section[aria-label="Quiz"]')
    const buttons = quizSection.locator('button[data-correct]')
    // Click first option
    await buttons.nth(0).click()
    // Attempt to click second option (should be locked/no-op)
    await buttons.nth(1).click()
    // Second option should still be data-variant="default" — not changed by second click
    await expect(buttons.nth(1)).toHaveAttribute('data-variant', 'default')
  })
})
