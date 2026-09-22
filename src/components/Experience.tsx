import { ArrowUpRight } from 'lucide-react'
import { content } from '../data/content'
import { experiences } from '../data/profile'
import type { Locale, Mode } from '../data/types'
import { SectionHeading } from './SectionHeading'

export function Experience({ locale, mode }: { locale: Locale; mode: Mode }) {
  const t = content[locale]
  return (
    <section id="experience" className="section section-anchor">
      <SectionHeading index="01" label={t.nav.experience} title={t.experienceTitle}>
        {t.experienceIntro}
      </SectionHeading>
      <div className="timeline">
        {experiences.map((item, index) => (
          <article className="experience-row" key={item.company}>
            <div className="experience-meta">
              <span className={`timeline-dot ${index === 0 ? 'current' : ''}`} />
              <span className="mono">{item.period[locale]}</span>
              {index === 0 && <span className="current-label">{t.current}</span>}
            </div>
            <div className="experience-body">
              <h3>{item.company}</h3>
              <p className="experience-role">{item.role}</p>
              <p>{item.description[locale]}</p>
              {item.promotion && (
                <p className="promotion">
                  <ArrowUpRight size={17} />
                  {item.promotion[locale]}
                </p>
              )}
              <ul className="experience-points">
                {item.points.map((point) => (
                  <li key={point.en}>{point[locale]}</li>
                ))}
              </ul>
              <div className="tags">
                {(mode === 'engineer' ? item.technologies : item.technologies.slice(0, 5)).map(
                  (tech) => (
                    <span key={tech}>{tech}</span>
                  ),
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
