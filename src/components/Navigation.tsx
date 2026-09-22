import { useState } from 'react'
import { Command, Menu, Moon, Sun, X } from 'lucide-react'
import { content, sectionIds } from '../data/content'
import type { Preferences } from '../lib/preferences'

interface Props {
  preferences: Preferences
  onLocale: () => void
  onTheme: () => void
  onPalette: () => void
}
export function Navigation({ preferences, onLocale, onTheme, onPalette }: Props) {
  const [expanded, setExpanded] = useState(false)
  const t = content[preferences.locale]
  return (
    <header className="site-header">
      <div className="nav-shell">
        <a href="#overview" className="brand">
          <span className="monogram">
            ec<span>.</span>
          </span>
          <span className="brand-caption">
            ENGINEERING
            <br />
            OPERATIONS CENTER
          </span>
          <span className="sr-only"> — Eduardo Caversan</span>
        </a>
        <nav
          id="navigation"
          aria-label={t.menu}
          className={expanded ? 'navigation expanded' : 'navigation'}
        >
          {sectionIds.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setExpanded(false)}>
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <div className="nav-tools">
          <button className="language-toggle" onClick={onLocale} title={t.switchLanguage}>
            <span className={preferences.locale === 'pt' ? 'selected' : ''}>PT</span>
            <span className="separator">/</span>
            <span className={preferences.locale === 'en' ? 'selected' : ''}>EN</span>
            <span className="sr-only"> — {t.switchLanguage}</span>
          </button>
          <button className="icon-button" aria-label={t.theme} onClick={onTheme}>
            {preferences.theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            className="icon-button command-trigger"
            onClick={onPalette}
            aria-label={`${t.palette} (Ctrl+K / Cmd+K)`}
          >
            <Command size={16} />
            <span>K</span>
          </button>
          <button
            className="icon-button mobile-menu"
            aria-label={expanded ? t.close : t.menu}
            aria-expanded={expanded}
            aria-controls="navigation"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}
