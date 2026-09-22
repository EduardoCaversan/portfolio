# Relatório de validação

Validação local em 21/09/2026 (America/Sao_Paulo), no build estático servido em `/portfolio/`.

## Ambiente e comandos

Node.js 24.21.0, React 19.3, TypeScript 6.0, Vite 8.3, Vitest 5.0, Playwright 1.63 e Lighthouse 13.5. O Node 21 originalmente instalado na máquina foi substituído no PATH dos comandos por um Node 24 temporário; não é compatível com esta stack. O repositório declara Node 24 em `.nvmrc` e `engines`.

| Validação                   | Comando                        | Resultado                                                             |
| --------------------------- | ------------------------------ | --------------------------------------------------------------------- |
| Instalação limpa            | `npm ci`                       | Concluída; audit sem vulnerabilidades reportadas                      |
| Lint                        | `npm run lint`                 | Sem erros ou warnings                                                 |
| Testes unitários/componente | `npm test`                     | 43 testes passaram em 3 arquivos                                      |
| TypeScript e build          | `npm run build`                | Aprovado, sem warnings de build                                       |
| Navegador                   | `npm run test:e2e`             | 16 testes passaram, desktop e mobile                                  |
| Links externos              | `node scripts/check-links.mjs` | Todos os 11 links GitHub responderam HTTP 200; LinkedIn respondeu 999 |
| Imagem social               | `npm run assets:social`        | PNG 1200 × 630 gerado da composição SVG versionada                    |
| Lighthouse                  | `npm run audit`                | Resultados abaixo                                                     |
| Diff                        | `git diff --check`             | Sem erros de whitespace                                               |

Os comandos foram executados com Node 24, inclusive por invocação direta dos CLIs equivalentes durante depuração. Os primeiros testes revelaram problemas de foco modal, âncoras após atualização, importação de fonte e animação em movimento reduzido; todos foram corrigidos e os testes passaram novamente.

## Lighthouse local

| Perfil                                  | Performance | Accessibility | Best Practices | SEO |
| --------------------------------------- | ----------: | ------------: | -------------: | --: |
| Mobile, configuração padrão             |          98 |           100 |            100 | 100 |
| Desktop, configuração desktop explícita |         100 |           100 |            100 | 100 |

Build de produção em Chromium headless, URL local `http://127.0.0.1:4174/portfolio/`. Resultados são medições de laboratório, não medições da hospedagem pública. O script salva HTML e JSON em `.validation/`, ignorada pelo Git. Diagnósticos remanescentes: JavaScript não utilizado na primeira tela, cadeia de dependências e CSS bloqueante; as quatro metas de 95+ foram atendidas. Sem falhas de nomes acessíveis na medição final.

## Cobertura de comportamento

- Parser: comandos válidos, normalização, argumentos inválidos, filtros e entrada arbitrária sem execução.
- Filtros .NET, Go e cloud; TaskFlow preserva o link da branch `entrega-3`.
- Preferências: PT-BR/escuro/Recruiter como padrão, persistência e recuperação de storage inválido ou bloqueado.
- Perfil: cargo, SustainOps, Celcoin, promoção, projetos, laboratórios e formação.
- Idioma EN, tema claro e modo Engineer sobrevivem à atualização; detalhes técnicos se expandem.
- Desktop 1440 × 1000 e emulação Pixel 7; larguras adicionais 320, 768 e 2560 px sem overflow horizontal.
- Pular navegação, Ctrl+K, Cmd+K, busca, setas, Enter, Escape, foco inicial, ciclo de Tab no diálogo e restauração de foco.
- Terminal: autocomplete, histórico, filtros, comandos por botões, `clear`, log acessível e saída de Tab após completar um comando.
- Inicialização pulável, uma vez por sessão, ignorada com movimento reduzido.
- Cópia de e-mail negada apresenta alternativa `mailto:` funcional.
- Navegação por âncoras e atualização direta em `/portfolio/#infrastructure`.
- Links internos resolvem destinos; nenhum asset 4xx ou erro de JavaScript/console na carga validada.
- axe-core sem violações WCAG A/AA verificadas nos temas escuro e claro e no terminal.

## Revisão visual e de conteúdo

Capturas reais de página completa e viewport estão em [screenshots](screenshots/), incluindo tema claro em inglês. Desktop e mobile foram inspecionados visualmente. Componentes, cabeçalho, tipografia, mapas e seções permanecem coerentes entre os temas.

Conteúdo revisado nos dois idiomas. Eduardo é apresentado como **Software Engineer Pleno · SustainOps**. A promoção foi registrada como evolução de Júnior a Pleno em aproximadamente seis meses, em março de 2026. Não foram incluídos cargos alternativos, currículo antigo, identificador acadêmico, informações confidenciais, dados pessoais sensíveis ou métricas de impacto inventadas.

BankApp, .NET Easy, Mini K6 e TaskFlow têm destaque. Terraform/Asterisk formam um único laboratório; Cloud & Deployment Labs aparece separadamente. Os dois experimentos de automação/scraping estão identificados como estudos, com limites e uso responsável. Não há execução de infraestrutura nem serviços externos no portfólio.

## Deploy e limites

- Workflow configurado para validar PRs e publicar somente `master` no GitHub Pages. Nenhum deploy de produção ou merge foi feito nesta implementação.
- Antes do primeiro deploy do novo workflow, selecionar **Settings → Pages → Source → GitHub Actions**. Configurações de repositório não são parte de uma branch; essa etapa fica documentada para a publicação após revisão.
- O LinkedIn bloqueia requests automatizados com HTTP 999; o link permanece exatamente como fornecido pelo autor. E-mail validado estruturalmente, sem envio de mensagem.
- `robots.txt` em um project site não controla a raiz do domínio. O sitemap canônico está disponível em `/portfolio/sitemap.xml`; nenhum outro repositório foi alterado.
- Auditoria automatizada e inspeção visual não substituem uma avaliação humana completa com leitores de tela. Não foi executada uma matriz de navegadores reais iOS/Safari/Firefox; os testes registrados usam Chromium desktop/mobile.

O histórico Git anterior foi preservado. Assets e fontes Angular, inclusive o PDF antigo, foram removidos da versão publicada e podem ser recuperados em commits anteriores.
