import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react'
import { content } from '../data/content'
import type { Locale, Mode, Project } from '../data/types'
import { ExternalLink } from './ExternalLink'
import { ProjectArchitecture } from './ProjectArchitecture'

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

function LayerVisual({ label, steps, note }: { label: string; steps: string[]; note: string }) {
  return (
    <div className="layer-visual">
      <span className="mono code-green">{label}</span>
      <div className="layer-stack">
        {steps.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
      <span className="visual-note">{note}</span>
    </div>
  )
}

function ProjectVisual({ id }: { id: string }) {
  if (id === 'incident-hub')
    return (
      <LayerVisual
        label="INCIDENT LIFECYCLE API"
        steps={['HTTP client', 'Express + auth', 'service + repository', 'MongoDB']}
        note="VALIDATE → AUTHORIZE → PERSIST → OBSERVE"
      />
    )
  if (id === 'ekklesia')
    return (
      <div className="window-visual">
        <div className="window-node">
          CONTROL
          <br />
          <small>preview · live</small>
        </div>
        <i aria-hidden="true" />
        <div className="window-node">
          DISPLAY
          <br />
          <small>projection</small>
        </div>
        <span className="visual-note">BROADCASTCHANNEL / STORAGE FALLBACK</span>
      </div>
    )
  if (id === 'webchat')
    return (
      <LayerVisual
        label="DIRECT MESSAGE FLOW"
        steps={['React client', 'Firebase Auth', 'Firestore rules', 'atomic write + snapshot']}
        note="IDENTITY → RULES → REALTIME STATE"
      />
    )
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
    <LayerVisual
      label="INFRASTRUCTURE AS CODE"
      steps={['Terraform', 'Droplet + firewall', 'cloud-init + Docker', 'Asterisk / PJSIP']}
      note="PROVISION → BOOTSTRAP → RUN"
    />
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
            {project.story && (
              <dl className="project-story">
                <div>
                  <dt>{t.problem}</dt>
                  <dd>{project.story.problem[locale]}</dd>
                </div>
                <div>
                  <dt>{t.engineering}</dt>
                  <dd>{project.story.engineering[locale]}</dd>
                </div>
                <div>
                  <dt>{t.result}</dt>
                  <dd>{project.story.result[locale]}</dd>
                </div>
              </dl>
            )}
            <ProjectArchitecture project={project} locale={locale} />
          </div>
        </details>
        <div className="project-links">
          {project.links.map((link) => (
            <ExternalLink
              key={link.url}
              href={link.url}
              aria-label={`${link.kind === 'demo' ? link.label : t.viewCode}: ${project.name}`}
              className={link.kind === 'demo' ? 'project-demo-link' : undefined}
            >
              {link.label}
              <ArrowUpRight size={15} />
            </ExternalLink>
          ))}
        </div>
      </div>
    </article>
  )
}
