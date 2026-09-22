import { useEffect, useState } from 'react'
import { content } from '../data/content'
import type { Locale } from '../data/types'

export function Boot({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    try {
      return sessionStorage.getItem('ec.booted') !== '1'
    } catch {
      return false
    }
  })
  const t = content[locale]
  useEffect(() => {
    if (!visible) return
    try {
      sessionStorage.setItem('ec.booted', '1')
    } catch {
      /* Session storage is optional. */
    }
    const timer = window.setTimeout(() => setVisible(false), 850)
    return () => window.clearTimeout(timer)
  }, [visible])
  if (!visible) return null
  return (
    <aside className="boot-panel" aria-label={t.boot}>
      <span className="mono">{t.boot}</span>
      <ul>
        {t.bootSteps.map((step, index) => (
          <li key={step} style={{ animationDelay: `${index * 140}ms` }}>
            <span>✓</span>
            {step}
          </li>
        ))}
      </ul>
      <button onClick={() => setVisible(false)}>{t.skipBoot} ↗</button>
    </aside>
  )
}
