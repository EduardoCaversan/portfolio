import { projects } from '../src/data/projects.ts'
import { profile } from '../src/data/profile.ts'

const urls = [
  ...new Set([
    profile.github,
    profile.linkedin,
    profile.source,
    ...projects.flatMap((project) => project.links.map((link) => link.url)),
  ]),
]
for (const url of urls) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: AbortSignal.timeout(15000),
      headers: { 'User-Agent': 'portfolio-link-validation' },
    })
    console.log(`${response.status} ${url}`)
    await response.body?.cancel()
    if (!response.ok && !url.includes('linkedin.com')) process.exitCode = 1
  } catch (error) {
    console.log(`UNVERIFIED ${url}: ${error.message}`)
    process.exitCode = 1
  }
}
