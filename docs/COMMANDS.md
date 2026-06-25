# Comandos Úteis — Climbing the Volcano

## Instalação

```bash
# Instalar todas as dependências
npm install

# Script legado para forçar instalação do Webpack
npm run install-web
```

## Desenvolvimento

```bash
# Subir servidor local (Express servindo dist/ na porta 8080)
npm start

# Equivalente direto
node api/server.js

# Build único (gera dist/app.js e dist/production-dependencies.js)
npm run build

# Build contínuo (watch mode)
npm run watch
```

### Fluxo típico de desenvolvimento

```bash
# Terminal 1 — rebuild automático
npm run watch

# Terminal 2 — servidor
npm start
```

Acessar: http://localhost:8080

### Porta customizada

```bash
# PowerShell
$env:PORT = "3000"; npm start

# Bash / Git Bash
PORT=3000 npm start
```

## Testes

```bash
# Executar todos os testes uma vez
npm test

# Modo watch (re-executa ao salvar)
npm run jest-watch

# Executar um arquivo específico
npx jest test/mockAPI.test.js

# Executar com cobertura
npx jest --coverage
```

## Lint

```bash
# Auto-fix nos arquivos de src/
npm run npx-fix

# Apenas verificar (sem corrigir)
npx eslint src/

# Verificar um arquivo específico
npx eslint src/Scenes/GameScene.js
```

## Build

```bash
# Produção
npm run build

# Arquivos gerados:
#   dist/app.js
#   dist/production-dependencies.js
```

> `dist/index.html` não é gerado pelo Webpack — editar manualmente se necessário.

## Formatação

Não há script de formatação (Prettier) configurado no projeto.

## Banco de dados

Não aplicável — o projeto não possui banco local.

## Docker

Não há `Dockerfile` ou `docker-compose.yml` no projeto.

## Git

```bash
# Status
git status

# Ver branch atual
git branch

# Histórico recente
git log --oneline -10
```

## Deploy (Vercel)

```bash
# Se Vercel CLI estiver instalado globalmente
vercel

# Build antes do deploy
npm run build
```

Configuração em `vercel.json` — serve conteúdo estático de `dist/`.

## Comandos de diagnóstico

```bash
# Verificar versão do Node
node --version

# Listar dependências instaladas
npm ls --depth=0

# Verificar se a porta 8080 está em uso (PowerShell)
netstat -ano | findstr :8080
```

## Comandos que NÃO existem no projeto

Os seguintes comandos **não estão definidos** no `package.json`:

- `npm run dev` — usar `npm run watch` + `npm start`
- `npm run lint` — usar `npm run npx-fix` ou `npx eslint src/`
- `npm run format` — não configurado
- `npm run migrate` / `npm run seed` — não há banco de dados
