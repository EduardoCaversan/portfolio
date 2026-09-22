import { ArrowUpRight, Copy, GraduationCap } from 'lucide-react'
import { content } from '../data/content'
import { education, profile, stack } from '../data/profile'
import type { Locale } from '../data/types'
import { SectionHeading } from './SectionHeading'
import { ExternalLink } from './ExternalLink'

export function Stack({ locale }: { locale: Locale }) {
  const t = content[locale]
  return (
    <section id="stack" className="section section-anchor">
      <SectionHeading index="04" label={t.nav.stack} title={t.stackTitle}>
        {t.stackIntro}
      </SectionHeading>
      <div className="stack-list">
        {stack.map((group, index) => (
          <article
            className={group.focus ? 'stack-row primary-stack' : 'stack-row'}
            key={group.title.en}
          >
            <div>
              <span className="mono stack-index">0{index + 1}</span>
              <h3>{group.title[locale]}</h3>
              {group.focus && <span className="focus-tag">{t.focus}</span>}
            </div>
            <div>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {group.note && <p className="stack-note">{group.note[locale]}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
export function Education({ locale }: { locale: Locale }) {
  const t = content[locale]
  return (
    <section id="education" className="section section-anchor">
      <SectionHeading index="05" label={t.nav.education} title={t.educationTitle} />
      <div className="education-row">
        <GraduationCap size={34} />
        <div>
          <h3>{education.course[locale]}</h3>
          <p>{education.institution}</p>
          <span className="muted">{education.campus}</span>
        </div>
        <span className="education-status">
          <span className="status-dot" />
          {education.status[locale]}
        </span>
      </div>
    </section>
  )
}
export function Contact({
  locale,
  onCopy,
  notice,
}: {
  locale: Locale
  onCopy: () => void
  notice: string
}) {
  const t = content[locale]
  return (
    <section id="contact" className="section contact-section section-anchor">
      <div className="eyebrow">06 / {t.nav.contact}</div>
      <h2>{t.contactTitle}</h2>
      <p>{t.contactText}</p>
      <div className="contact-email">
        <a href={`mailto:${profile.email}`}>
          {profile.email}
          <ArrowUpRight size={26} />
        </a>
        <button className="icon-button" onClick={onCopy} aria-label={t.copy}>
          <Copy size={18} />
        </button>
      </div>
      <div className="contact-socials">
        <ExternalLink href={profile.linkedin}>
          LinkedIn
          <ArrowUpRight size={16} />
        </ExternalLink>
        <ExternalLink href={profile.github}>
          GitHub
          <ArrowUpRight size={16} />
        </ExternalLink>
      </div>
      <p className="copy-notice" role="status">
        {notice}
      </p>
    </section>
  )
}
export function Footer({ locale }: { locale: Locale }) {
  const t = content[locale]
  return (
    <footer className="footer">
      <div>
        <span className="monogram">
          ec<span>.</span>
        </span>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
      </div>
      <p>Built with React, TypeScript and an engineering mindset.</p>
      <div>
        <ExternalLink href={profile.source}>
          {t.source}
          <ArrowUpRight size={12} />
        </ExternalLink>
        <span className="deploy-status">
          <span className="status-dot" />
          {t.deployment}
        </span>
      </div>
    </footer>
  )
}
