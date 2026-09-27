export type Locale = 'pt' | 'en'
export type Localized = Record<Locale, string>
export type Mode = 'recruiter' | 'engineer'
export type Theme = 'dark' | 'light'
export type StackFilter = 'all' | 'dotnet' | 'node' | 'go' | 'cloud' | 'mobile' | 'python'
export type SectionId =
  'overview' | 'experience' | 'projects' | 'infrastructure' | 'stack' | 'education' | 'contact'
export interface Project {
  id: string
  name: string
  subtitle: string
  category: 'featured' | 'secondary'
  status: 'Project' | 'Lab' | 'Experiment' | 'Tool'
  description: Localized
  detail: Localized
  technologies: readonly string[]
  stacks: readonly StackFilter[]
  links: readonly { label: string; url: string; kind: 'repository' | 'demo' }[]
  highlights: Localized[]
  flow: readonly string[]
  story?: {
    problem: Localized
    engineering: Localized
    result: Localized
  }
}
