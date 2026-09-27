import { useState } from 'react'
import { content } from '../data/content'
import { projects } from '../data/projects'
import type { Locale, Mode, StackFilter } from '../data/types'
import { filterProjects } from '../lib/terminal'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './SectionHeading'

export function Projects({ locale, mode }: { locale: Locale; mode: Mode }) {
  const [filter, setFilter] = useState<StackFilter>('all')
  const t = content[locale]
  const featured = filterProjects(
    projects.filter((project) => project.category === 'featured'),
    filter,
  )
  const filters: [StackFilter, string][] = [
    ['all', t.all],
    ['dotnet', '.NET'],
    ['node', 'Node.js'],
    ['go', 'Go'],
    ['cloud', 'Cloud'],
  ]
  return (
    <>
      <section id="projects" className="section section-anchor">
        <SectionHeading index="02" label={t.nav.projects} title={t.projectsTitle}>
          {t.projectsIntro}
        </SectionHeading>
        <div className="project-toolbar">
          <span className="mono">SELECTED WORK / 01—06</span>
          <div className="project-filters" role="group" aria-label={t.nav.projects}>
            {filters.map(([value, label]) => (
              <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="project-grid">
          {featured.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              mode={mode}
              index={projects.indexOf(project)}
            />
          ))}
        </div>
        <span className="sr-only" role="status">
          {featured.length} {t.nav.projects}
        </span>
      </section>
      <section id="infrastructure" className="section section-anchor">
        <SectionHeading index="03" label={t.nav.infrastructure} title={t.infraTitle}>
          {t.infraIntro}
        </SectionHeading>
        <div className="experiments-header">
          <h3>{t.secondaryTitle}</h3>
          <p>{t.secondaryIntro}</p>
        </div>
        <div className="experiment-grid">
          {projects
            .filter((project) => project.category === 'secondary')
            .map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                locale={locale}
                mode={mode}
                index={index}
              />
            ))}
        </div>
      </section>
    </>
  )
}
