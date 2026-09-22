import type { Localized } from './types'

export const profile = {
  name: 'Eduardo Caversan',
  role: 'Software Engineer Pleno',
  area: 'SustainOps',
  github: 'https://github.com/EduardoCaversan',
  linkedin: 'https://www.linkedin.com/in/deveduardocaversan/',
  email: 'educaversan.dev@gmail.com',
  source: 'https://github.com/EduardoCaversan/portfolio',
  url: 'https://eduardocaversan.github.io/portfolio/',
  headline: {
    pt: 'Construo software, investigo falhas de produção e transformo incidentes recorrentes em soluções estruturais.',
    en: 'I build software, investigate production failures and turn recurring incidents into structural solutions.',
  },
  description: {
    pt: 'Engenheiro de Software com foco em backend, sistemas distribuídos e sustentação de ambientes financeiros críticos. Trabalho com desenvolvimento, investigação de incidentes, análise de causa raiz, observabilidade e evolução estrutural de aplicações.',
    en: 'Software Engineer focused on backend development, distributed systems and the sustainment of critical financial environments. I work across software development, incident investigation, root-cause analysis, observability and structural application improvements.',
  },
}

interface Experience {
  company: string
  period: Localized
  role: string
  description: Localized
  promotion?: Localized
  points: Localized[]
  technologies: string[]
}
export const experiences: Experience[] = [
  {
    company: 'Celcoin',
    period: { pt: 'Setembro 2025 — Presente', en: 'September 2025 — Present' },
    role: 'Software Engineer Pleno — SustainOps',
    description: {
      pt: 'Atuação em SustainOps na sustentação e evolução de sistemas financeiros críticos, investigando incidentes em produção, analisando causas raiz e implementando correções estruturais em aplicações e integrações distribuídas.',
      en: 'Working in SustainOps to maintain and evolve critical financial systems, investigate production incidents, analyze root causes and implement structural fixes across distributed applications and integrations.',
    },
    promotion: {
      pt: 'De Júnior a Pleno em aproximadamente seis meses. Promoção em março de 2026.',
      en: 'Promoted from Junior to Mid-Level Software Engineer within approximately six months, in March 2026.',
    },
    points: [
      {
        pt: 'Desenvolvimento e sustentação de APIs, serviços e integrações financeiras.',
        en: 'Development and sustainment of APIs, services and financial integrations.',
      },
      {
        pt: 'Investigação com logs e métricas; análise de causa raiz e correções para evitar recorrência.',
        en: 'Investigation through logs and metrics; root-cause analysis and fixes to prevent recurrence.',
      },
      {
        pt: 'Fluxos assíncronos, mensageria, cache, retry e resiliência em sistemas distribuídos.',
        en: 'Asynchronous flows, messaging, caching, retries and resilience in distributed systems.',
      },
    ],
    technologies: [
      '.NET 6/8',
      'C#',
      'PHP',
      'TypeScript',
      'Node.js',
      'SQL Server',
      'MySQL',
      'MongoDB',
      'Redis',
      'Azure Service Bus',
      'Azure App Service',
      'Azure Container Registry',
      'AWS',
      'Datadog',
      'Kibana',
      'CloudWatch',
    ],
  },
  {
    company: 'Adven.Tech',
    period: { pt: 'Janeiro 2023 — Agosto 2025', en: 'January 2023 — August 2025' },
    role: 'Software Engineer',
    description: {
      pt: 'Desenvolvimento e evolução de aplicações web utilizando .NET, Angular e SQL Server, participando de funcionalidades de backend e frontend, integrações assíncronas, observabilidade e processos de entrega.',
      en: 'Development and evolution of web applications using .NET, Angular and SQL Server, contributing to backend and frontend features, asynchronous integrations, observability and delivery processes.',
    },
    points: [
      {
        pt: 'Aplicações relacionadas a eventos e gestão de estoque.',
        en: 'Applications related to events and inventory management.',
      },
      {
        pt: 'Evolução entre Angular 11 e Angular 19, integrações com Azure Service Bus e observabilidade com Elastic APM.',
        en: 'Evolution from Angular 11 to Angular 19, Azure Service Bus integrations and observability with Elastic APM.',
      },
      {
        pt: 'Processos de CI/CD e entrega com Azure DevOps.',
        en: 'CI/CD and delivery processes with Azure DevOps.',
      },
    ],
    technologies: [
      '.NET 6/8',
      'Angular 11–19',
      'SQL Server',
      'Azure Service Bus',
      'Elastic APM',
      'Azure DevOps',
      'CI/CD',
    ],
  },
]

export const stack: { title: Localized; focus?: boolean; items: string[]; note?: Localized }[] = [
  {
    title: { pt: 'Backend', en: 'Backend' },
    focus: true,
    items: [
      'C#',
      '.NET 6/8',
      'ASP.NET Core',
      'REST APIs',
      'Entity Framework Core',
      'Dapper',
      'PHP',
      'Laravel',
      'Node.js',
      'Go',
      'Java',
    ],
  },
  {
    title: { pt: 'Observabilidade e produção', en: 'Observability & production' },
    focus: true,
    items: [
      'Datadog',
      'Kibana',
      'CloudWatch',
      'Elastic APM',
      'Serilog',
      'Logs',
      'Metrics',
      'Distributed troubleshooting',
      'Root-cause analysis',
      'Retry & resilience',
    ],
  },
  {
    title: { pt: 'Dados e mensageria', en: 'Data & messaging' },
    items: [
      'SQL Server',
      'MySQL',
      'MariaDB',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Azure Service Bus',
    ],
  },
  {
    title: { pt: 'Cloud e entrega', en: 'Cloud & delivery' },
    items: [
      'Azure',
      'AWS',
      'Docker',
      'Docker Compose',
      'Terraform',
      'GitHub Actions',
      'Azure DevOps',
      'Kubernetes',
      'GCP',
    ],
    note: {
      pt: 'GCP: experiência de laboratório. AWS: exposição profissional.',
      en: 'GCP: lab experience. AWS: professional exposure.',
    },
  },
  {
    title: { pt: 'Frontend e mobile', en: 'Frontend & mobile' },
    items: [
      'TypeScript',
      'Angular',
      'React',
      'Vite',
      'Next.js',
      'Android',
      'Java',
      'Room',
      'SQLite',
    ],
  },
]

export const education = {
  institution: 'Universidade Tecnológica Federal do Paraná — UTFPR',
  course: {
    pt: 'Bacharelado em Engenharia de Software',
    en: 'Bachelor’s Degree in Software Engineering',
  },
  campus: 'Cornélio Procópio',
  status: { pt: 'Em andamento', en: 'In progress' },
}
