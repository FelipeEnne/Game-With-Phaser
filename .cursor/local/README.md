# Contexto local do agente

Arquivos **só para você e para o Cursor**. Ficam no `.gitignore` e não vão para o GitHub.

## Índice

| Arquivo | Quando consultar |
|---------|------------------|
| [projeto.md](projeto.md) | Visão geral, stack, comandos, links |
| [arquitetura.md](arquitetura.md) | Módulos, dependências, bootstrap do jogo |
| [cenas.md](cenas.md) | Fluxo das 9 cenas, transições, gameplay |
| [dados.md](dados.md) | Model, localStorage, boardGold, pipeline de score |
| [build-deploy.md](build-deploy.md) | Webpack, Express, Vercel, `dist/` |
| [testes.md](testes.md) | Jest, mocks, lacunas de cobertura |
| [gotchas.md](gotchas.md) | Bugs conhecidos e armadilhas do código legado |
| [decisoes.md](decisoes.md) | Decisões técnicas e regras de trabalho |
| [plano-atual.md](plano-atual.md) | Tarefa atual e próximos passos |

## Como manter

- **`plano-atual.md`** — atualize no início de cada sessão de trabalho
- **`decisoes.md`** — registre escolhas que o agente não deve reverter
- **`gotchas.md`** — adicione bugs novos que forem descobertos
- Demais arquivos — atualize quando a estrutura ou comportamento do código mudar

## Dica

Para forçar leitura de um arquivo no chat: `@.cursor/local/nome-do-arquivo.md`
