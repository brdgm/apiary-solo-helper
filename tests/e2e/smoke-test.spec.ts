import { test, expect } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('Apiary Solo Helper')
  await page.getByRole('link', { name: 'Play Game' }).click()

  // setup game
  await expect(page.locator('h1')).toHaveText('Setup Game')
  await page.getByRole('button', { name: 'Setup Automa' }).click()
  await page.getByRole('button', { name: 'Start Game' }).click()

  // finish game
  await page.getByRole('button', { name: 'End Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'End Game' }).click()
  await page.getByRole('button', { name: 'End Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'End Game' }).click()

  // app home
  await expect(page.locator('h1')).toHaveText('Apiary Solo Helper')
})
