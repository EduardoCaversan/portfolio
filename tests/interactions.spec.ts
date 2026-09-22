import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
})

test('narrow and ultrawide screens retain content without horizontal overflow', async ({
  page,
}) => {
  for (const width of [320, 768, 2560]) {
    await page.setViewportSize({ width, height: 1000 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  }
})

test('palette keyboard actions, focus containment and clipboard fallback', async ({ page }) => {
  await page.keyboard.press('Control+k')
  const dialog = page.getByRole('dialog')
  const input = dialog.getByRole('textbox')
  await input.fill('')
  await input.press('ArrowDown')
  await expect(dialog.locator('.active')).toHaveText('Experiência')
  await input.press('Enter')
  await expect(page).toHaveURL(/#experience$/)
  await page.keyboard.press('Control+k')
  for (let index = 0; index < 18; index++) {
    await page.keyboard.press('Tab')
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true)
  }
  await input.fill('terminal')
  await input.press('Enter')
  await expect(page.getByRole('dialog', { name: 'Terminal interativo' })).toBeVisible()
  await page.keyboard.press('Escape')
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: () => Promise.reject(new Error('Permission denied')),
      configurable: true,
    })
  })
  await page.getByRole('button', { name: 'Copiar e-mail', exact: true }).click()
  await expect(
    page.getByRole('status').filter({ hasText: 'Não foi possível copiar.' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'educaversan.dev@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:educaversan.dev@gmail.com',
  )
})
