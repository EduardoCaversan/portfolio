import lighthouse from 'lighthouse'
import desktopConfig from 'lighthouse/core/config/desktop-config.js'
import { chromium } from '@playwright/test'
import { launch } from 'chrome-launcher'
import { mkdir, writeFile } from 'node:fs/promises'

const chrome = await launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
})
try {
  await mkdir('.validation', { recursive: true })
  for (const preset of ['mobile', 'desktop']) {
    const result = await lighthouse(
      'http://127.0.0.1:4174/portfolio/',
      {
        port: chrome.port,
        output: 'html',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
      preset === 'desktop' ? desktopConfig : undefined,
    )
    if (!result) throw new Error('Lighthouse did not produce a result')
    await writeFile(`.validation/lighthouse-${preset}.html`, result.report)
    const scores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, value]) => [
        key,
        Math.round(value.score * 100),
      ]),
    )
    const failed = Object.values(result.lhr.audits)
      .filter((audit) => audit.score !== null && audit.score < 1)
      .map((audit) => ({
        id: audit.id,
        title: audit.title,
        score: audit.score,
        displayValue: audit.displayValue,
        ...(audit.id === 'label-content-name-mismatch' ? { details: audit.details } : {}),
      }))
    await writeFile(
      `.validation/lighthouse-${preset}.json`,
      JSON.stringify({ scores, failed }, null, 2),
    )
    console.log(preset, JSON.stringify({ scores, failed }))
  }
} finally {
  await chrome.kill()
}
