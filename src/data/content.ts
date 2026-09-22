import type { Locale, SectionId } from './types'

interface Content {
  nav: Record<SectionId, string>
  skip: string
  menu: string
  theme: string
  switchLanguage: string
  palette: string
  search: string
  empty: string
  explore: string
  contact: string
  viewCode: string
  technical: string
  close: string
  copy: string
  copied: string
  copyFailed: string
  view: string
  recruiter: string
  engineer: string
  modeHint: string
  focus: string
  heroLabel: string
  heroLead: string
  heroAccent: string
  heroEnd: string
  mapLabel: string
  mapCaption: string
  facts: readonly [string, string][]
  experienceTitle: string
  experienceIntro: string
  current: string
  projectsTitle: string
  projectsIntro: string
  all: string
  infraTitle: string
  infraIntro: string
  experimentsTitle: string
  experimentsIntro: string
  stackTitle: string
  stackIntro: string
  educationTitle: string
  contactTitle: string
  contactText: string
  source: string
  deployment: string
  terminal: string
  terminalIntro: string
  terminalInput: string
  terminalUnknown: string
  terminalInvalid: string
  boot: string
  bootSteps: readonly string[]
  skipBoot: string
  shortcuts: string
  emailAction: string
}

export const content: Record<Locale, Content> = {
  pt: {
    switchLanguage: 'Switch to English',
    nav: {
      overview: 'Visão geral',
      experience: 'Experiência',
      projects: 'Projetos',
      infrastructure: 'Infraestrutura',
      stack: 'Stack',
      education: 'Formação',
      contact: 'Contato',
    },
    skip: 'Pular para o conteúdo',
    menu: 'Abrir navegação',
    theme: 'Alternar tema',
    palette: 'Abrir comandos',
    search: 'Buscar uma ação...',
    empty: 'Nenhum resultado.',
    explore: 'Explorar projetos',
    contact: 'Entrar em contato',
    viewCode: 'Ver código',
    technical: 'Detalhes de engenharia',
    close: 'Fechar',
    copy: 'Copiar e-mail',
    copied: 'E-mail copiado.',
    copyFailed: 'Não foi possível copiar. Use o link de e-mail.',
    view: 'Visualização',
    recruiter: 'Recruiter',
    engineer: 'Engineer',
    modeHint: 'O essencial, com contexto.',
    focus: 'Foco principal',
    heroLabel: 'SOFTWARE ENGINEER PLENO · SUSTAINOPS',
    heroLead: 'Software bem construído.',
    heroAccent: 'Produção bem',
    heroEnd: 'compreendida.',
    mapLabel: 'MAPA DE ATUAÇÃO',
    mapCaption: 'Do código ao comportamento em produção.',
    facts: [
      ['Cargo atual', 'Software Engineer Pleno'],
      ['Área', 'SustainOps'],
      ['Foco', 'Backend & Production Engineering'],
      ['Experiência desde', 'Janeiro de 2023'],
      ['Empresa atual', 'Celcoin'],
      ['Localização', 'Paraná, Brasil'],
      ['Preferência', 'Remoto'],
    ],
    experienceTitle: 'Código em produção. Aprendizado contínuo.',
    experienceIntro: 'Da construção de aplicações à investigação do que acontece depois do deploy.',
    current: 'Atual',
    projectsTitle: 'Engenharia, na prática.',
    projectsIntro:
      'Uma seleção de projetos que traduzem diferentes formas de pensar e construir software.',
    all: 'Todos',
    infraTitle: 'Além da aplicação.',
    infraIntro:
      'Laboratórios de infraestrutura, automação e entrega. Ambientes de estudo, com escopo explícito.',
    experimentsTitle: 'Espaço para experimentar.',
    experimentsIntro:
      'Estudos de automação e concorrência. Ideias em exploração, com limites claros.',
    stackTitle: 'Ferramentas com propósito.',
    stackIntro:
      'Backend e produção no centro. As demais competências conectam o ciclo de desenvolvimento.',
    educationTitle: 'Fundamentos em construção contínua.',
    contactTitle: 'Vamos investigar o próximo desafio.',
    contactText:
      'Tem um sistema difícil, uma integração crítica ou um problema de produção que precisa de investigação? Vamos conversar.',
    source: 'Código-fonte',
    deployment: 'Entrega estática · GitHub Pages',
    terminal: 'Terminal interativo',
    terminalIntro:
      'Explore este perfil por comandos. Digite help para começar. Nenhum comando do sistema é executado.',
    terminalInput: 'Digite um comando',
    terminalUnknown: 'Comando não encontrado. Digite help.',
    terminalInvalid: 'Use projects --stack dotnet, go, cloud, mobile ou python.',
    boot: 'INICIALIZANDO PERFIL DE ENGENHARIA',
    bootSteps: [
      'Carregando experiência',
      'Indexando projetos selecionados',
      'Carregando mapa de tecnologias',
      'Sistema pronto',
    ],
    skipBoot: 'Pular inicialização',
    shortcuts: 'Atalhos para explorar',
    emailAction: 'Enviar e-mail',
  },
  en: {
    switchLanguage: 'Mudar para português',
    nav: {
      overview: 'Overview',
      experience: 'Experience',
      projects: 'Projects',
      infrastructure: 'Infrastructure',
      stack: 'Stack',
      education: 'Education',
      contact: 'Contact',
    },
    skip: 'Skip to content',
    menu: 'Open navigation',
    theme: 'Toggle theme',
    palette: 'Open commands',
    search: 'Search for an action...',
    empty: 'No results.',
    explore: 'Explore projects',
    contact: 'Get in touch',
    viewCode: 'View code',
    technical: 'Engineering details',
    close: 'Close',
    copy: 'Copy email',
    copied: 'Email copied.',
    copyFailed: 'Could not copy. Use the email link.',
    view: 'View',
    recruiter: 'Recruiter',
    engineer: 'Engineer',
    modeHint: 'The essentials, with context.',
    focus: 'Primary focus',
    heroLabel: 'SOFTWARE ENGINEER PLENO · SUSTAINOPS',
    heroLead: 'Software built with care.',
    heroAccent: 'Production',
    heroEnd: 'understood.',
    mapLabel: 'ENGINEERING MAP',
    mapCaption: 'From code to behavior in production.',
    facts: [
      ['Current role', 'Software Engineer Pleno'],
      ['Area', 'SustainOps'],
      ['Main focus', 'Backend & Production Engineering'],
      ['Experience since', 'January 2023'],
      ['Current company', 'Celcoin'],
      ['Location', 'Paraná, Brazil'],
      ['Work preference', 'Remote'],
    ],
    experienceTitle: 'Code in production. Continuous learning.',
    experienceIntro: 'From building applications to investigating what happens after deployment.',
    current: 'Current',
    projectsTitle: 'Engineering, in practice.',
    projectsIntro:
      'Selected projects that reflect different ways of thinking about and building software.',
    all: 'All',
    infraTitle: 'Beyond the application.',
    infraIntro:
      'Labs in infrastructure, automation and delivery. Learning environments with an explicit scope.',
    experimentsTitle: 'Room to experiment.',
    experimentsIntro:
      'Studies in automation and concurrency. Ideas under exploration, with clear boundaries.',
    stackTitle: 'Tools with a purpose.',
    stackIntro:
      'Backend and production at the center. Supporting skills connect the development cycle.',
    educationTitle: 'Foundations that keep evolving.',
    contactTitle: 'Let’s investigate the next challenge.',
    contactText:
      'Have a difficult system, a critical integration or a production problem that needs investigation? Let’s talk.',
    source: 'Source code',
    deployment: 'Static delivery · GitHub Pages',
    terminal: 'Interactive terminal',
    terminalIntro:
      'Explore this profile using commands. Type help to start. No system commands are executed.',
    terminalInput: 'Enter a command',
    terminalUnknown: 'Command not found. Type help.',
    terminalInvalid: 'Use projects --stack dotnet, go, cloud, mobile or python.',
    boot: 'INITIALIZING ENGINEERING PROFILE',
    bootSteps: [
      'Loading experience',
      'Indexing selected projects',
      'Loading technology map',
      'System ready',
    ],
    skipBoot: 'Skip initialization',
    shortcuts: 'Shortcuts to explore',
    emailAction: 'Send email',
  },
}
export const sectionIds: SectionId[] = [
  'overview',
  'experience',
  'projects',
  'infrastructure',
  'stack',
  'education',
  'contact',
]
