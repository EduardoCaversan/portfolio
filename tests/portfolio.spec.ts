import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
})

test('base path, links, assets and responsive layout', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  const failures: string[] = []
  page.on('response', (response) => {
    if (response.url().startsWith('http://127.0.0.1') && response.status() >= 400)
      failures.push(response.url())
  })
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  const invalid = await page
    .locator('a[href]')
    .evaluateAll((links) =>
      links
        .map((el) => el.getAttribute('href')!)
        .filter((href) =>
          href.startsWith('#')
            ? !document.getElementById(href.slice(1))
            : !/^(https:\/\/|mailto:)/.test(href),
        ),
    )
  expect(invalid).toEqual([])
  await expect(page.getByRole('link', { name: /Ver código: TaskFlow/ })).toHaveAttribute(
    'href',
    /\/tree\/entrega-3$/,
  )
  await page.goto('./#infrastructure')
  await page.reload()
  await expect(page.locator('#infrastructure')).toBeInViewport()
  expect(errors).toEqual([])
  expect(failures).toEqual([])
})

test('language, theme and density persist across refresh', async ({ page }, testInfo) => {
  await page.getByRole('button', { name: 'Switch to English' }).click()
  await page.getByRole('button', { name: 'Toggle theme' }).click()
  await page.getByRole('button', { name: 'Engineer', exact: true }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.getByRole('button', { name: 'Engineer', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  expect(
    await page
      .locator('details')
      .evaluateAll((items) => items.every((item) => item.hasAttribute('open'))),
  ).toBe(true)
  await expect(page.getByText('Software Engineer Pleno — SustainOps')).toBeVisible()
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(accessibility.violations).toEqual([])
  await page.screenshot({ path: `docs/screenshots/${testInfo.project.name}-light-engineer.png` })
})

test('keyboard navigation, command palette focus and actions', async ({ page }) => {
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main')).toBeFocused()
  await page.keyboard.press('Control+k')
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('textbox')).toBeFocused()
  await dialog.getByRole('textbox').fill('tema')
  await page.keyboard.press('Enter')
  await expect(dialog).not.toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.keyboard.press('Meta+k')
  await expect(dialog).toBeVisible()
  await dialog.getByRole('textbox').fill('infra')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#infrastructure$/)
  await page.keyboard.press('Control+k')
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
})

test('terminal parser, filters, autocomplete, history and mobile shortcuts', async ({ page }) => {
  await page.getByRole('button', { name: 'Terminal interativo', exact: true }).click()
  const dialog = page.getByRole('dialog')
  const input = dialog.getByRole('textbox')
  await input.fill('projects --stack g')
  await input.press('Tab')
  await expect(input).toHaveValue('projects --stack go')
  await input.press('Enter')
  await expect(dialog.getByRole('log')).toContainText('Mini K6')
  await expect(dialog.getByRole('log')).toContainText('Concurrent Lead Scraper API')
  await expect(dialog.getByRole('log')).not.toContainText('BankApp')
  await input.press('ArrowUp')
  await expect(input).toHaveValue('projects --stack go')
  await input.press('ArrowDown')
  await expect(input).toHaveValue('')
  await dialog.getByRole('button', { name: 'whoami', exact: true }).click()
  await expect(dialog.getByRole('log')).toContainText('Software Engineer Pleno · SustainOps')
  await dialog.getByRole('button', { name: 'clear', exact: true }).click()
  await expect(dialog.getByRole('log')).toBeEmpty()
  await input.fill('help')
  await input.press('Tab')
  await expect(input).not.toBeFocused()
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(accessibility.violations).toEqual([])
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Terminal interativo', exact: true })).toBeFocused()
})

test('dark theme accessibility and real screenshot', async ({ page }, testInfo) => {
  await page.evaluate(() => document.fonts.ready)
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(accessibility.violations).toEqual([])
  await page.screenshot({ path: `docs/screenshots/${testInfo.project.name}.png`, fullPage: true })
  await page.screenshot({ path: `docs/screenshots/${testInfo.project.name}-overview.png` })
})

test('boot only once per session, reduced motion and mobile navigation', async ({
  page,
  isMobile,
}) => {
  await expect(page.locator('.boot-panel')).toHaveCount(0)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.reload()
  await expect(page.locator('.boot-panel')).toBeVisible()
  await page.getByRole('button', { name: 'Pular inicialização' }).click()
  await page.reload()
  await expect(page.locator('.boot-panel')).toHaveCount(0)
  if (isMobile) {
    await page.getByRole('button', { name: 'Abrir navegação' }).click()
    await page.getByRole('navigation').getByRole('link', { name: 'Formação' }).click()
    await expect(page).toHaveURL(/#education$/)
    await expect(page.getByRole('button', { name: 'Abrir navegação' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  }
})
