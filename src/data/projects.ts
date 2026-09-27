import type { Project } from './types'

const repo = (slug: string) => `https://github.com/EduardoCaversan/${slug}`

export const projects: Project[] = [
  {
    id: 'incident-hub',
    name: 'IncidentHub',
    subtitle: 'Incident management REST API',
    category: 'featured',
    status: 'Project',
    description: {
      pt: 'Registra incidentes e serviços afetados com papéis, filtros, paginação e verificação de saúde da API e do banco.',
      en: 'Registers incidents and affected services with roles, filtering, pagination, and API/database health checks.',
    },
    detail: {
      pt: 'API Node.js modular: middleware autentica e autoriza, controllers traduzem HTTP, services aplicam regras e repositories isolam consultas Mongoose. O Compose executa API e MongoDB com health checks e volume persistente.',
      en: 'A modular Node.js API: middleware authenticates and authorizes, controllers translate HTTP, services apply rules, and repositories isolate Mongoose queries. Compose runs the API and MongoDB with health checks and a persistent volume.',
    },
    technologies: ['Node.js', 'Express 5', 'MongoDB', 'Mongoose', 'JWT', 'Zod', 'Docker Compose'],
    stacks: ['node'],
    links: [{ label: 'GitHub', url: repo('incident-hub'), kind: 'repository' }],
    highlights: [
      {
        pt: 'Perfis ADMIN, ENGINEER e VIEWER; validação de body, parâmetros e queries antes dos controllers.',
        en: 'ADMIN, ENGINEER, and VIEWER roles; body, parameter, and query validation before controllers.',
      },
      {
        pt: 'OpenAPI modular, testes HTTP com Supertest e MongoDB em memória para autenticação, filtros, paginação e segurança.',
        en: 'Modular OpenAPI plus HTTP tests with Supertest and an in-memory MongoDB for authentication, filters, pagination, and security.',
      },
    ],
    story: {
      problem: {
        pt: 'Concentrar o acompanhamento de incidentes, serviços afetados e responsabilidade operacional.',
        en: 'Centralize tracking of incidents, affected services, and operational ownership.',
      },
      engineering: {
        pt: 'Separação explícita entre transporte, regras e persistência, com segurança e contratos verificáveis.',
        en: 'An explicit split between transport, rules, and persistence, with security and verifiable contracts.',
      },
      result: {
        pt: 'Uma API executável e documentada para registrar, consultar e evoluir o ciclo de um incidente.',
        en: 'An executable, documented API for recording, querying, and evolving an incident lifecycle.',
      },
    },
    flow: ['HTTP client', 'Express + middleware', 'Service layer', 'Repository', 'MongoDB'],
  },
  {
    id: 'ekklesia',
    name: 'Ekklesia',
    subtitle: 'Local-first worship presentation console',
    category: 'featured',
    status: 'Project',
    description: {
      pt: 'Console local-first para preparar um culto em uma janela e operar a projeção em outra, sem backend obrigatório.',
      en: 'A local-first console that prepares a service in one window and runs projection in another, without a required backend.',
    },
    detail: {
      pt: 'Aplicação React/PWA com rotas independentes para controle e display. Estado de operação é sincronizado entre janelas por BroadcastChannel, com fallback por storage; biblioteca e arquivos importados persistem localmente em IndexedDB.',
      en: 'A React/PWA with independent control and display routes. Operating state synchronizes between windows via BroadcastChannel with a storage fallback; the library and imported files persist locally in IndexedDB.',
    },
    technologies: ['React', 'TypeScript', 'PWA', 'IndexedDB', 'BroadcastChannel', 'Zustand'],
    stacks: ['node'],
    links: [
      { label: 'Open Ekklesia', url: 'https://eduardocaversan.github.io/ekklesia/', kind: 'demo' },
      { label: 'GitHub', url: repo('ekklesia'), kind: 'repository' },
    ],
    highlights: [
      {
        pt: 'Preview e Live separados evitam colocar conteúdo no ar antes da confirmação do operador.',
        en: 'Separate Preview and Live states prevent content going on air before operator confirmation.',
      },
      {
        pt: 'Dados do operador, favoritos e mídia ficam no navegador; não há telemetria, upload ou sincronização cloud própria.',
        en: 'Operator data, favorites, and media stay in the browser; there is no telemetry, upload, or first-party cloud sync.',
      },
    ],
    story: {
      problem: {
        pt: 'Operar conteúdo ao vivo sem exigir conta, servidor ou infraestrutura para equipes locais.',
        en: 'Operate live content without requiring an account, server, or infrastructure from local teams.',
      },
      engineering: {
        pt: 'Duas superfícies coordenadas, persistência local e recuperação de sessão tratam uma operação que não pode interromper o encontro.',
        en: 'Two coordinated surfaces, local persistence, and session recovery support an operation that cannot interrupt the event.',
      },
      result: {
        pt: 'Planejamento, biblioteca e projeção em um produto publicável como site estático.',
        en: 'Planning, library, and projection in a product that can be published as a static site.',
      },
    },
    flow: ['Control window', 'BroadcastChannel / storage', 'Display window', 'IndexedDB'],
  },
  {
    id: 'webchat',
    name: 'Entre',
    subtitle: 'Realtime direct messaging',
    category: 'featured',
    status: 'Project',
    description: {
      pt: 'Chat direto em tempo real com login Google, conversas determinísticas e regras que restringem cada conversa aos participantes.',
      en: 'A realtime direct chat with Google sign-in, deterministic conversations, and rules that restrict each conversation to its participants.',
    },
    detail: {
      pt: 'Cliente React/Vite conecta diretamente a Firebase Auth e Firestore. Regras validam identidade, participantes, formato e sequência; transações criam uma conversa por par e escrita de mensagem, prévia e contador ocorre de forma atômica.',
      en: 'A React/Vite client connects directly to Firebase Auth and Firestore. Rules validate identity, participants, shape, and sequence; transactions create one conversation per pair, while message, preview, and counter writes happen atomically.',
    },
    technologies: ['React', 'TypeScript', 'Firebase Auth', 'Firestore', 'Security Rules', 'Docker'],
    stacks: ['node'],
    links: [{ label: 'GitHub', url: repo('webchat'), kind: 'repository' }],
    highlights: [
      {
        pt: 'Assinaturas em tempo real, histórico paginado e limites de leitura evitam carregar conversas sem limite.',
        en: 'Realtime subscriptions, paginated history, and read limits prevent unbounded conversation loading.',
      },
      {
        pt: 'Testes usam Auth/Firestore Emulator para validar regras, integração concorrente e fluxo de navegador sem tocar no projeto real.',
        en: 'Tests use the Auth/Firestore Emulator to validate rules, concurrent integration, and browser flows without touching the real project.',
      },
    ],
    story: {
      problem: {
        pt: 'Entregar comunicação direta e instantânea em um produto estático, sem expor conversas a terceiros.',
        en: 'Deliver direct, instant communication in a static product without exposing conversations to third parties.',
      },
      engineering: {
        pt: 'A autorização vive nas regras do banco; transações e validações de esquema mantêm conversa e mensagens consistentes.',
        en: 'Authorization lives in database rules; transactions and schema validation keep conversations and messages consistent.',
      },
      result: {
        pt: 'Um chat funcional que demonstra segurança de dados e comportamento concorrente como parte do produto.',
        en: 'A working chat that demonstrates data security and concurrent behavior as part of the product.',
      },
    },
    flow: [
      'React client',
      'Firebase Auth',
      'Firestore rules',
      'Atomic writes',
      'Realtime snapshots',
    ],
  },
  {
    id: 'bankapp',
    name: 'BankApp',
    subtitle: 'Layered banking API',
    category: 'featured',
    status: 'Project',
    description: {
      pt: 'API demonstrativa para contas, cartões e transações, com autenticação JWT, integração de compliance e persistência PostgreSQL.',
      en: 'A demonstration API for accounts, cards, and transactions with JWT authentication, a compliance integration, and PostgreSQL persistence.',
    },
    detail: {
      pt: 'Solução .NET 8 dividida em Domain, Application, Infrastructure, Web API e testes. MediatR organiza comandos e consultas; EF Core persiste o domínio e Refit isola a integração externa de compliance.',
      en: 'A .NET 8 solution split into Domain, Application, Infrastructure, Web API, and tests. MediatR organizes commands and queries; EF Core persists the domain and Refit isolates the external compliance integration.',
    },
    technologies: ['.NET 8', 'ASP.NET Core', 'PostgreSQL', 'EF Core', 'MediatR', 'JWT', 'xUnit'],
    stacks: ['dotnet'],
    links: [{ label: 'GitHub', url: repo('bank-api'), kind: 'repository' }],
    highlights: [
      {
        pt: 'Separação de dependências entre domínio, aplicação, infraestrutura e borda HTTP.',
        en: 'Dependency separation between the domain, application, infrastructure, and HTTP edge.',
      },
      {
        pt: 'Validações, paginação, Swagger e testes de controllers com xUnit e Moq.',
        en: 'Validation, pagination, Swagger, and controller tests with xUnit and Moq.',
      },
    ],
    story: {
      problem: {
        pt: 'Explorar um domínio financeiro com operações, acesso autenticado e uma integração externa.',
        en: 'Explore a financial domain with operations, authenticated access, and an external integration.',
      },
      engineering: {
        pt: 'Camadas protegem o domínio das escolhas de transporte e persistência, mantendo os fluxos testáveis.',
        en: 'Layers protect the domain from transport and persistence choices, keeping flows testable.',
      },
      result: {
        pt: 'Uma referência de API .NET documentada, testada e com fronteiras arquiteturais explícitas.',
        en: 'A documented, tested .NET API reference with explicit architectural boundaries.',
      },
    },
    flow: [
      'HTTP API',
      'Application / MediatR',
      'Domain',
      'Infrastructure',
      'PostgreSQL + compliance API',
    ],
  },
  {
    id: 'mini-k6',
    name: 'Mini K6',
    subtitle: 'Concurrent load-testing CLI',
    category: 'featured',
    status: 'Tool',
    description: {
      pt: 'CLI em Go que executa cenários HTTP concorrentes e entrega métricas agregadas para investigar o comportamento de uma API sob carga.',
      en: 'A Go CLI that runs concurrent HTTP scenarios and outputs aggregate metrics to investigate API behavior under load.',
    },
    detail: {
      pt: 'Cada usuário concorrente executa o cenário até o limite de duração ou requisições. Goroutines produzem resultados em channel; o agregador calcula sucesso, falhas, RPS, duração e códigos de status antes de exportar JSON.',
      en: 'Each concurrent user executes the scenario until the duration or request limit. Goroutines produce results through a channel; the aggregator calculates success, failures, RPS, duration, and status codes before exporting JSON.',
    },
    technologies: ['Go', 'Goroutines', 'Channels', 'HTTP', 'Timeouts', 'JSON'],
    stacks: ['go'],
    links: [{ label: 'GitHub', url: repo('mini-k6'), kind: 'repository' }],
    highlights: [
      {
        pt: 'Controle por duração e máximo de requisições, com timeout de cliente HTTP.',
        en: 'Duration and maximum-request controls, with an HTTP client timeout.',
      },
      {
        pt: 'Resumo estruturado com distribuição de status e requests per second para análise posterior.',
        en: 'A structured summary with status distribution and requests per second for further analysis.',
      },
    ],
    story: {
      problem: {
        pt: 'Observar rapidamente como um endpoint responde quando vários clientes trabalham ao mesmo tempo.',
        en: 'Quickly observe how an endpoint responds when several clients work at the same time.',
      },
      engineering: {
        pt: 'Concorrência explícita, limites de execução e agregação separam o disparo de tráfego da leitura dos resultados.',
        en: 'Explicit concurrency, execution limits, and aggregation separate traffic generation from reading the results.',
      },
      result: {
        pt: 'Uma ferramenta pequena para transformar um cenário HTTP em dados analisáveis.',
        en: 'A small tool that turns an HTTP scenario into analyzable data.',
      },
    },
    flow: ['Scenario input', 'Concurrent workers', 'HTTP client', 'Result channel', 'JSON summary'],
  },
  {
    id: 'voip',
    name: 'VoIP Infrastructure Lab',
    subtitle: 'Terraform + Docker + Asterisk',
    category: 'featured',
    status: 'Lab',
    description: {
      pt: 'Laboratório reproduzível que provisiona um Droplet e firewall na DigitalOcean, prepara a máquina e sobe Asterisk em container.',
      en: 'A reproducible lab that provisions a DigitalOcean Droplet and firewall, prepares the host, and runs Asterisk in a container.',
    },
    detail: {
      pt: 'Terraform declara Droplet Ubuntu e regras de entrada SIP/RTP/SSH. Cloud-init instala Docker e Docker Compose no primeiro boot; o repositório complementar monta a configuração PJSIP e extensões do Asterisk.',
      en: 'Terraform declares an Ubuntu Droplet and SIP/RTP/SSH inbound rules. Cloud-init installs Docker and Docker Compose at first boot; the companion repository mounts Asterisk PJSIP and extension configuration.',
    },
    technologies: [
      'Terraform',
      'DigitalOcean',
      'Cloud-init',
      'Docker Compose',
      'Asterisk',
      'PJSIP',
    ],
    stacks: ['cloud'],
    links: [
      { label: 'Terraform', url: repo('terraform-voip'), kind: 'repository' },
      { label: 'Asterisk config', url: repo('asterisk-docker'), kind: 'repository' },
    ],
    highlights: [
      {
        pt: 'Infraestrutura declarativa e configuração inicial automatizada a partir do provisionamento.',
        en: 'Declarative infrastructure and automated initial configuration from provisioning onward.',
      },
      {
        pt: 'Firewall expõe somente SSH, SIP e a faixa RTP configurada para o laboratório.',
        en: 'The firewall exposes only SSH, SIP, and the RTP range configured for the lab.',
      },
    ],
    story: {
      problem: {
        pt: 'Reproduzir a jornada de provisionar e configurar um serviço de voz sem passos manuais dispersos.',
        en: 'Reproduce the journey of provisioning and configuring a voice service without scattered manual steps.',
      },
      engineering: {
        pt: 'Infraestrutura, bootstrap e serviço são versionados em duas partes com limites e portas explícitos.',
        en: 'Infrastructure, bootstrap, and service are versioned in two parts with explicit boundaries and ports.',
      },
      result: {
        pt: 'Um laboratório que conecta IaC, host configuration e containerização — não uma plataforma VoIP de produção.',
        en: 'A lab connecting IaC, host configuration, and containerization—not a production VoIP platform.',
      },
    },
    flow: [
      'Terraform',
      'DigitalOcean Droplet + firewall',
      'Cloud-init',
      'Docker Compose',
      'Asterisk / PJSIP',
    ],
  },
  {
    id: 'dotnet-easy',
    name: '.NET Easy',
    subtitle: 'Project scaffolding CLI',
    category: 'secondary',
    status: 'Tool',
    description: {
      pt: 'CLI em Python para gerar o ponto de partida de APIs, workers, webhooks e gRPC com escolhas de arquitetura e entrega.',
      en: 'A Python CLI that generates a starting point for APIs, workers, webhooks, and gRPC with architecture and delivery choices.',
    },
    detail: {
      pt: 'O fluxo interativo combina preset, banco e destino para gerar estrutura .NET, Docker Compose e pipeline GitHub Actions. É uma ferramenta de padronização e experiência do desenvolvedor.',
      en: 'The interactive flow combines preset, database, and destination to generate a .NET structure, Docker Compose, and a GitHub Actions pipeline. It is a standardization and developer-experience tool.',
    },
    technologies: ['Python', '.NET', 'Clean Architecture', 'Docker Compose', 'GitHub Actions'],
    stacks: ['dotnet', 'python'],
    links: [{ label: 'GitHub', url: repo('dotnet-easy'), kind: 'repository' }],
    highlights: [
      {
        pt: 'Cobre presets de Web API, worker, webhook manager e gRPC.',
        en: 'Covers Web API, worker, webhook-manager, and gRPC presets.',
      },
    ],
    flow: [],
  },
  {
    id: 'lead-scraper',
    name: 'Concurrent Lead Scraper API',
    subtitle: 'Go concurrency experiment',
    category: 'secondary',
    status: 'Experiment',
    description: {
      pt: 'Experimento em Go que coordena busca e parsing de dados públicos com goroutines, channels, timeout e cancelamento.',
      en: 'A Go experiment that coordinates public-data search and parsing with goroutines, channels, timeouts, and cancellation.',
    },
    detail: {
      pt: 'API Fiber que usa context, WaitGroup e Mutex para coordenar páginas e extrair contatos públicos. O projeto é um estudo; qualquer uso deve respeitar termos e privacidade.',
      en: 'A Fiber API that uses context, WaitGroup, and Mutex to coordinate pages and extract public contacts. It is a study; any use must respect terms and privacy.',
    },
    technologies: ['Go', 'Fiber', 'Goroutines', 'Channels', 'Context', 'HTML parsing'],
    stacks: ['go'],
    links: [{ label: 'GitHub', url: repo('lead-scrapper-api'), kind: 'repository' }],
    highlights: [
      {
        pt: 'Mostra coordenação de I/O concorrente sem prometer uma plataforma de coleta em produção.',
        en: 'Shows concurrent I/O coordination without claiming a production data-collection platform.',
      },
    ],
    flow: [],
  },
]
