import { describe, expect, it } from 'vitest'
import { projects } from '../data/projects'
import { autocomplete, executeCommand, filterProjects, parseCommand } from './terminal'

describe('terminal parser', () => {
  it.each([
    'help',
    'whoami',
    'experience',
    'projects',
    'skills',
    'education',
    'contact',
    'github',
    'linkedin',
    'clear',
  ])('accepts %s and normalizes whitespace/case', (command) => {
    expect(parseCommand(`  ${command.toUpperCase()}  `)).toEqual({ command })
  })
  it.each(['dotnet', 'go', 'cloud', 'mobile', 'python'])('parses explicit stack %s', (stack) => {
    expect(parseCommand(`projects   --stack ${stack}`)).toEqual({ command: 'projects', stack })
  })
  it.each([
    'projects --stack',
    'projects --stack unknown',
    'projects --stack go extra',
    'projects --other go',
  ])('rejects malformed filter: %s', (command) =>
    expect(parseCommand(command)).toEqual({ error: 'invalid' }),
  )
  it.each(['', 'help extra', 'rm -rf /', 'whoami; github', '<script>alert(1)</script>'])(
    'does not interpret arbitrary input: %s',
    (command) => expect(parseCommand(command)).toEqual({ error: 'unknown' }),
  )
  it('autocompletes command prefixes without trapping Tab on a complete command', () => {
    expect(autocomplete('proj')).toBe('projects')
    expect(autocomplete('projects --stack g')).toBe('projects --stack go')
    expect(autocomplete('')).toBeUndefined()
    expect(autocomplete('unknown')).toBeUndefined()
  })
})
describe('project filters and terminal output', () => {
  it('returns only .NET projects', () =>
    expect(filterProjects(projects, 'dotnet').map((p) => p.id)).toEqual(['bankapp', 'dotnet-easy']))
  it('returns Go projects across categories', () =>
    expect(filterProjects(projects, 'go').map((p) => p.id)).toEqual(['mini-k6', 'lead-scraper']))
  it('returns cloud labs and keeps the original collection intact', () => {
    expect(filterProjects(projects, 'cloud').map((p) => p.id)).toEqual(['voip', 'cloud-labs'])
    expect(filterProjects(projects, 'all')).toHaveLength(8)
  })
  it('uses the completed TaskFlow branch in output', () =>
    expect(executeCommand('projects', 'pt').links).toContainEqual({
      label: 'TaskFlow / entrega-3',
      url: 'https://github.com/EduardoCaversan/TaskFlow/tree/entrega-3',
    }))
  it('returns localized content and honest role', () => {
    expect(executeCommand('whoami', 'en').text).toContain('Software Engineer Pleno · SustainOps')
    expect(executeCommand('whoami', 'pt').text).toContain('Engenheiro de Software')
    expect(executeCommand('unknown', 'pt').text).toContain('Comando não encontrado')
  })
  it('clears presentation history without system effects', () =>
    expect(executeCommand('clear', 'en')).toEqual({ text: '', clear: true }))
  it('makes external commands explicit links', () => {
    expect(executeCommand('github', 'en').links?.[0]?.url).toBe(
      'https://github.com/EduardoCaversan',
    )
    expect(executeCommand('contact', 'pt').text).toBe('educaversan.dev@gmail.com')
  })
})
