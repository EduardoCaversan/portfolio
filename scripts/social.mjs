import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'

// Rasterize the repository's own vector composition for social crawlers.
const browser = await chromium.launch({ headless: true })
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  })
  const svg = await readFile(new URL('../public/og-source.svg', import.meta.url), 'utf8')
  await page.setContent(`<html><body style="margin:0">${svg}</body></html>`)
  await page.screenshot({ path: 'public/og-image.png' })
} finally {
  await browser.close()
}
