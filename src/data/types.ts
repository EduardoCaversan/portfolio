export type Locale = 'pt' | 'en'
export type Localized = Record<Locale, string>
export type Mode = 'recruiter' | 'engineer'
export type Theme = 'dark' | 'light'
export type StackFilter = 'all' | 'dotnet' | 'go' | 'cloud' | 'mobile' | 'python'
export type SectionId =
  'overview' | 'experience' | 'projects' | 'infrastructure' | 'stack' | 'education' | 'contact'
export interface Project {
  id: string
  name: string
  subtitle: string
  category: 'featured' | 'infrastructure' | 'experiment'
  status: 'Project' | 'Lab' | 'Experiment'
  description: Localized
  detail: Localized
  technologies: readonly string[]
  stacks: readonly StackFilter[]
  links: readonly { label: string; url: string }[]
  highlights: Localized[]
  flow: readonly string[]
  branch?: string
}
