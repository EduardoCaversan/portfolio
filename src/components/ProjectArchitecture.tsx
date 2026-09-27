import { ArrowRight, ChevronDown } from 'lucide-react'
import { content } from '../data/content'
import type { Locale, Project } from '../data/types'

export function ProjectArchitecture({ project, locale }: { project: Project; locale: Locale }) {
  if (project.flow.length === 0) return null
  const t = content[locale]
  return (
    <details className="project-architecture">
      <summary>
        {t.architecture}
        <ChevronDown size={15} />
      </summary>
      <ol className="architecture-flow" aria-label={`${project.name}: ${project.flow.join(' → ')}`}>
        {project.flow.map((step, index) => (
          <li key={step}>
            <span>{step}</span>
            {index < project.flow.length - 1 && <ArrowRight size={13} aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </details>
  )
}
