import { ArrowRight, ArrowUpRight, ChevronDown, GitBranch } from 'lucide-react'
import { content } from '../data/content'
import type { Locale, Mode, Project } from '../data/types'
import { ExternalLink } from './ExternalLink'

export function ProjectFlow({ project }: { project: Project }) {
  return (
    <ol className="project-flow" aria-label={`${project.name}: ${project.flow.join(' → ')}`}>
      {project.flow.map((step, index) => (
        <li key={step}>
          <span>{step}</span>
          {index < project.flow.length - 1 && <ArrowRight size={13} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  )
}
function ProjectVisual({ id }: { id: string }) {
  if (id === 'bankapp')
    return (
      <div className="code-visual">
        <div>
          <span className="code-purple">public sealed class</span>{' '}
          <span className="code-green">TransferCommand</span>
        </div>
        <div className="indent">: IRequest&lt;Result&gt;</div>
        <div>{'{'}</div>
        <div className="indent">
          <span className="code-purple">public</span> decimal Amount {'{ get; init; }'}
        </div>
        <div>{'}'}</div>
        <span className="visual-note">DOMAIN → APPLICATION → INFRASTRUCTURE</span>
      </div>
    )
  if (id === 'dotnet-easy')
    return (
      <div className="code-visual">
        <div>
          <span className="code-green">❯</span> python dotnet_easy.py
        </div>
        <div className="cli-line">
          <span>Architecture</span>
          <b>Clean Architecture</b>
        </div>
        <div className="cli-line">
          <span>Database</span>
          <b>PostgreSQL</b>
        </div>
        <div className="cli-line">
          <span>Delivery</span>
          <b>Docker + GitHub Actions</b>
        </div>
        <span className="visual-note">CONFIGURE → GENERATE → BUILD</span>
      </div>
    )
  if (id === 'mini-k6')
    return (
      <div className="concurrency-visual">
        <span className="mono">goroutines</span>
        <div className="concurrency-paths">
          {[0, 1, 2, 3, 4].map((n) => (
            <div key={n}>
              <span>worker_{n + 1}</span>
              <i />
              <span>HTTP</span>
            </div>
          ))}
        </div>
        <span className="visual-note">CONCURRENT REQUESTS → STRUCTURED RESULTS</span>
      </div>
    )
  return (
    <div className="mobile-architecture">
      <div className="android-symbol">
        <span />
        <span />
        <span />
      </div>
      <div>
        <span className="mono code-green">OFFLINE FIRST</span>
        <div className="mobile-layers">
          <span>Java / Material 3</span>
          <span>Repository / Room</span>
          <span>SQLite</span>
        </div>
      </div>
    </div>
  )
}
export function ProjectCard({
  project,
  locale,
  mode,
  index,
}: {
  project: Project
  locale: Locale
  mode: Mode
  index: number
}) {
  const t = content[locale]
  return (
    <article className={`project-card project-${project.id}`}>
      {project.category === 'featured' && (
        <div className="project-visual" aria-hidden="true">
          <div className="visual-top">
            <span>
              {String(index + 1).padStart(2, '0')} / {project.subtitle}
            </span>
            <span>↗</span>
          </div>
          <ProjectVisual id={project.id} />
        </div>
      )}
      <div className="project-content">
        <div className="project-category">
          <span>{project.status}</span>
          {project.branch && (
            <span>
              <GitBranch size={12} />
              {project.branch}
            </span>
          )}
        </div>
        <h3>
          {project.name}
          <span className="project-subtitle">{project.subtitle}</span>
        </h3>
        <p>{project.description[locale]}</p>
        <div className="tags">
          {project.technologies.slice(0, mode === 'engineer' ? undefined : 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <details className="technical-details" key={mode} open={mode === 'engineer'}>
          <summary>
            {t.technical}
            <ChevronDown size={15} />
          </summary>
          <div>
            <p>{project.detail[locale]}</p>
            <ul>
              {project.highlights.map((item) => (
                <li key={item.en}>{item[locale]}</li>
              ))}
            </ul>
            {project.flow.length > 0 && <ProjectFlow project={project} />}
          </div>
        </details>
        <div className="project-links">
          {project.links.map((link) => (
            <ExternalLink
              key={link.url}
              href={link.url}
              aria-label={`${t.viewCode}: ${link.label}`}
            >
              {project.links.length > 1 ? link.label : t.viewCode}
              <ArrowUpRight size={15} />
            </ExternalLink>
          ))}
        </div>
      </div>
    </article>
  )
}
