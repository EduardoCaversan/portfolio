import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Database,
  Activity,
  GitBranch,
  Layers3,
  Terminal,
} from 'lucide-react'
import { m, useReducedMotion } from 'motion/react'
import { profile } from '../data/profile'
import { content } from '../data/content'
import type { Locale, Mode } from '../data/types'
import { ExternalLink } from './ExternalLink'

export function Hero({
  locale,
  mode,
  onMode,
  onTerminal,
}: {
  locale: Locale
  mode: Mode
  onMode: (mode: Mode) => void
  onTerminal: () => void
}) {
  const t = content[locale]
  const reducedMotion = useReducedMotion()
  return (
    <section id="overview" className="hero section-anchor" aria-labelledby="hero-title">
      <div className="workspace-bar">
        <span>
          <span className="status-dot" /> EDUARDO CAVERSAN{' '}
          <span className="muted">/ ENGINEERING PROFILE</span>
        </span>
        <span className="workspace-location">PARANÁ, BR · UTC−03</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow role-label">{t.heroLabel}</div>
          <p className="hero-name">{profile.name}</p>
          <h1 id="hero-title">
            {t.heroLead}
            <br />
            <span>
              {t.heroAccent}
              <br />
              {t.heroEnd}
            </span>
          </h1>
          <p className="hero-headline">{profile.headline[locale]}</p>
          <p className="hero-description">{profile.description[locale]}</p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              {t.explore}
              <ArrowDown size={16} />
            </a>
            <a className="button secondary" href="#contact">
              {t.contact}
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="social-row">
            <ExternalLink href={profile.github}>
              GitHub <ArrowUpRight size={13} />
            </ExternalLink>
            <ExternalLink href={profile.linkedin}>
              LinkedIn <ArrowUpRight size={13} />
            </ExternalLink>
            <span className="social-divider" />
            <span className="mono">C# / .NET / DISTRIBUTED SYSTEMS</span>
          </div>
        </div>
        <m.div
          className="engineering-map"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <div className="map-heading">
            <span className="mono">{t.mapLabel}</span>
            <span className="map-cross">+</span>
          </div>
          <div className="map-canvas">
            <div className="map-orbit orbit-one" />
            <div className="map-orbit orbit-two" />
            <svg className="map-lines" viewBox="0 0 480 380" fill="none" aria-hidden="true">
              <path d="M240 190L91 88M240 190L390 90M240 190L390 297M240 190L90 295" />
              <circle cx="240" cy="190" r="65" />
            </svg>
            <div className="map-node node-backend">
              <Braces size={20} />
              <span>BACKEND</span>
              <small>.NET / APIs</small>
            </div>
            <div className="map-node node-data">
              <Database size={20} />
              <span>DATA</span>
              <small>SQL / Messaging</small>
            </div>
            <div className="map-core">
              <Layers3 size={27} />
              <strong>
                SOFTWARE
                <br />
                ENGINEERING
              </strong>
              <span>SustainOps</span>
            </div>
            <div className="map-node node-cloud">
              <GitBranch size={20} />
              <span>CLOUD</span>
              <small>Azure / Automation</small>
            </div>
            <div className="map-node node-ops">
              <Activity size={20} />
              <span>PRODUCTION</span>
              <small>Logs / Root cause</small>
            </div>
          </div>
          <div className="map-footer">
            <span className="status-dot" />
            <span>{t.mapCaption}</span>
            <span className="mono">01—04</span>
          </div>
        </m.div>
      </div>
      <div className="view-bar">
        <div className="view-switch" role="group" aria-label={t.view}>
          <span className="mono view-label">{t.view}</span>
          <button aria-pressed={mode === 'recruiter'} onClick={() => onMode('recruiter')}>
            {t.recruiter}
          </button>
          <button aria-pressed={mode === 'engineer'} onClick={() => onMode('engineer')}>
            {t.engineer}
          </button>
        </div>
        <span className="view-hint">{mode === 'recruiter' ? t.modeHint : t.technical}</span>
        <button className="terminal-trigger" onClick={onTerminal}>
          <Terminal size={16} />
          <span>{t.terminal}</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <dl className="operational-summary">
        {t.facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
