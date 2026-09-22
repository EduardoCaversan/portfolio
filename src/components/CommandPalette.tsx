import { useState } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import { content, sectionIds } from '../data/content'
import { profile } from '../data/profile'
import type { Locale } from '../data/types'
import { Dialog } from './Dialog'

interface Props {
  locale: Locale
  onClose: () => void
  onLocale: () => void
  onTheme: () => void
  onMode: () => void
  onCopy: () => void
  onTerminal: () => void
}
export default function CommandPalette({
  locale,
  onClose,
  onLocale,
  onTheme,
  onMode,
  onCopy,
  onTerminal,
}: Props) {
  const t = content[locale]
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const actions: {
    id: string
    label: string
    action?: () => void
    href?: string
    external?: boolean
  }[] = [
    ...sectionIds.map((id) => ({ id, label: t.nav[id], href: `#${id}` })),
    {
      id: 'language',
      label: t.switchLanguage,
      action: onLocale,
    },
    { id: 'theme', label: t.theme, action: onTheme },
    { id: 'mode', label: `${t.view}: Recruiter / Engineer`, action: onMode },
    { id: 'github', label: 'GitHub', href: profile.github, external: true },
    { id: 'linkedin', label: 'LinkedIn', href: profile.linkedin, external: true },
    { id: 'copy', label: t.copy, action: onCopy },
    { id: 'terminal', label: t.terminal, action: onTerminal },
  ]
  const normalize = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  const filtered = actions.filter((action) => normalize(action.label).includes(normalize(query)))
  return (
    <Dialog title={t.palette} closeLabel={t.close} onClose={onClose} className="command-dialog">
      <div className="palette-search">
        <Search size={19} />
        <input
          autoFocus
          aria-label={t.search}
          placeholder={t.search}
          value={query}
          aria-controls="command-results"
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault()
              const next =
                event.key === 'ArrowDown'
                  ? (active + 1) % Math.max(filtered.length, 1)
                  : (active - 1 + filtered.length) % Math.max(filtered.length, 1)
              setActive(next)
              document
                .getElementById(`command-${filtered[next]?.id}`)
                ?.scrollIntoView({ block: 'nearest' })
            }
            if (event.key === 'Enter') {
              event.preventDefault()
              document.getElementById(`command-${filtered[active]?.id}`)?.click()
            }
          }}
        />
        <kbd>esc</kbd>
      </div>
      <ul id="command-results" className="command-results" aria-label={t.shortcuts}>
        {filtered.map((action, index) => (
          <li key={action.id}>
            {action.href ? (
              <a
                id={`command-${action.id}`}
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className={index === active ? 'active' : ''}
                onClick={onClose}
              >
                {action.label}
                <ArrowUpRight size={15} />
              </a>
            ) : (
              <button
                id={`command-${action.id}`}
                className={index === active ? 'active' : ''}
                onClick={() => {
                  onClose()
                  action.action?.()
                }}
              >
                {action.label}
                <span>↵</span>
              </button>
            )}
          </li>
        ))}
      </ul>
      <span className="sr-only" role="status">
        {filtered[active]?.label ?? t.empty}
      </span>
      {filtered.length === 0 && (
        <p className="palette-empty" role="status">
          {t.empty}
        </p>
      )}
      <div className="palette-footer mono">↑ ↓ &nbsp; / &nbsp; Enter &nbsp; / &nbsp; Esc</div>
    </Dialog>
  )
}
