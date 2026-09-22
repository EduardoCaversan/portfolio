import { projects } from '../data/projects'
import { education, experiences, profile, stack } from '../data/profile'
import { content } from '../data/content'
import type { Locale, Project, StackFilter } from '../data/types'

export const commands = [
  'help',
  'whoami',
  'experience',
  'projects',
  'projects --stack dotnet',
  'projects --stack go',
  'projects --stack cloud',
  'skills',
  'education',
  'contact',
  'github',
  'linkedin',
  'clear',
] as const
type Command =
  | 'help'
  | 'whoami'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'contact'
  | 'github'
  | 'linkedin'
  | 'clear'
export type ParsedCommand =
  { command: Command; stack?: StackFilter } | { error: 'unknown' | 'invalid' }
const filters: readonly string[] = ['dotnet', 'go', 'cloud', 'mobile', 'python']
export function parseCommand(input: string): ParsedCommand {
  const parts = input.trim().toLowerCase().split(/\s+/)
  const command = parts[0] ?? ''
  if (command === 'projects' && parts.length > 1) {
    if (parts.length !== 3 || parts[1] !== '--stack' || !filters.includes(parts[2] ?? ''))
      return { error: 'invalid' }
    return { command, stack: parts[2] as StackFilter }
  }
  if (parts.length !== 1 || !commands.some((item) => item === command)) return { error: 'unknown' }
  return { command: command as Command }
}
export function filterProjects(items: readonly Project[], filter: StackFilter): Project[] {
  return items.filter((project) => filter === 'all' || project.stacks.includes(filter))
}
export function autocomplete(input: string): string | undefined {
  if (!input.trim()) return undefined
  return commands.find((command) => command.startsWith(input.trim().toLowerCase()))
}
export interface TerminalOutput {
  text: string
  links?: { label: string; url: string }[]
  clear?: boolean
}
export function executeCommand(input: string, locale: Locale): TerminalOutput {
  const parsed = parseCommand(input)
  const t = content[locale]
  if ('error' in parsed)
    return { text: parsed.error === 'invalid' ? t.terminalInvalid : t.terminalUnknown }
  switch (parsed.command) {
    case 'clear':
      return { text: '', clear: true }
    case 'help':
      return { text: commands.join('\n') }
    case 'whoami':
      return {
        text: `${profile.name}\n${profile.role} · ${profile.area}\n${profile.description[locale]}`,
      }
    case 'experience':
      return {
        text: experiences
          .map(
            (item) =>
              `${item.company} | ${item.period[locale]}\n${item.role}\n${item.description[locale]}`,
          )
          .join('\n\n'),
      }
    case 'projects': {
      const items = filterProjects(projects, parsed.stack ?? 'all')
      return {
        text: items
          .map((item) => `${item.name} [${item.status}]\n${item.description[locale]}`)
          .join('\n\n'),
        links: items.flatMap((item) => item.links),
      }
    }
    case 'skills':
      return {
        text: stack
          .map((group) => `${group.title[locale]}: ${group.items.join(', ')}`)
          .join('\n\n'),
      }
    case 'education':
      return {
        text: `${education.institution}\n${education.course[locale]} · ${education.campus}\n${education.status[locale]}`,
      }
    case 'contact':
      return {
        text: profile.email,
        links: [
          { label: t.emailAction, url: `mailto:${profile.email}` },
          { label: 'LinkedIn', url: profile.linkedin },
        ],
      }
    case 'github':
      return { text: 'GitHub', links: [{ label: profile.github, url: profile.github }] }
    case 'linkedin':
      return { text: 'LinkedIn', links: [{ label: profile.linkedin, url: profile.linkedin }] }
  }
}
