# Security Updates Log

Registro de atualizações de dependências e vulnerabilidades corrigidas.

**Data:** 2026-06-24  
**Branch:** development

---

## Resumo

| Métrica | Antes | Depois |
|---------|------:|-------:|
| Total vulnerabilidades | 83 | 23 |
| Critical | 37 | 0 |
| High | 17 | 1 |
| Moderate | 22 | 22 |
| Low | 7 | 0 |

---

## Pacotes atualizados (diretos)

### Lote 1

| Pacote | Versão antiga | Versão nova | Tipo |
|--------|-------------:|------------:|------|
| node-fetch | 3.3.1 | 3.3.2 | direta (prod) |
| jest-canvas-mock | 2.5.0 | 2.5.2 | direta (dev) |
| html-webpack-plugin | 5.5.1 | 5.6.7 | direta (dev) |
| eslint-plugin-import | 2.27.5 | 2.32.0 | direta (dev) |
| css-loader | 6.7.3 | 6.11.0 | direta (dev) |
| style-loader | 3.3.2 | 3.3.4 | direta (dev) |

### Lote 2

| Pacote | Versão antiga | Versão nova | Tipo |
|--------|-------------:|------------:|------|
| express | 4.18.2 | 4.22.2 | direta (prod) |

### Lote 3

| Pacote | Versão antiga | Versão nova | Tipo |
|--------|-------------:|------------:|------|
| @babel/core | 7.21.8 | 7.29.7 | direta (dev) |
| @babel/preset-env | 7.21.5 | 7.29.7 | direta (dev) |
| @babel/plugin-transform-runtime | 7.21.4 | 7.29.7 | direta (dev) |
| @babel/runtime | 7.21.5 | 7.29.7 | direta (dev) |

### Lote 4

| Pacote | Versão antiga | Versão nova | Tipo |
|--------|-------------:|------------:|------|
| jest | 29.5.0 | 29.7.0 | direta (dev) |
| babel-jest | 29.5.0 | 29.7.0 | direta (dev) |

### Lote 5

| Pacote | Versão antiga | Versão nova | Tipo |
|--------|-------------:|------------:|------|
| webpack | 5.82.1 | 5.107.2 | direta (dev) |
| webpack-dev-server | 4.15.0 | 4.15.2 | direta (dev) |

### Lote 7 — Remoções (maior impacto em segurança)

| Pacote | Versão removida | Motivo |
|--------|----------------:|--------|
| babel-core | 4.7.16 | Babel 6 legado; 37 critical via babel-traverse |
| babel-preset-env | 1.7.0 | Deprecated, não usado |
| babel-preset-es2015 | 6.24.1 | Deprecated, não usado |
| babel-preset-stage-0 | 6.24.1 | Deprecated, não usado |
| babel-polyfill | 6.26.0 | Não usado |
| babel-loader | 9.1.2 | Não usado no webpack.config.js |
| babel-plugin-transform-* | 6.x | Não usados |
| @types/babel-core | 6.25.7 | Tipos para babel-core removido |
| @vercel/node | 2.14.2 | Não usado (deploy estático) |
| phaser3-rex-plugins | 1.60.1 | Não importado (CDN no Preloader) |

---

## Correções por tipo

| Método | Descrição |
|--------|-----------|
| Atualização direta | Pacotes listados acima via `npm install pacote@versao` |
| Remoção | Babel 6, @vercel/node, phaser3-rex-plugins via `npm uninstall` |
| `npm audit fix` (sem `--force`) | Transitivos adicionais após limpeza Babel 6 |
| Overrides | **Não utilizados** nesta rodada |

---

## Comandos executados

```bash
# Lote 1
npm install node-fetch@3.3.2
npm install -D jest-canvas-mock@2.5.2 html-webpack-plugin@5.6.7 eslint-plugin-import@2.32.0 css-loader@6.11.0 style-loader@3.3.4

# Lote 2
npm install express@4.22.2

# Lote 3
npm install -D @babel/core@7.29.7 @babel/preset-env@7.29.7 @babel/plugin-transform-runtime@7.29.7 @babel/runtime@7.29.7

# Lote 4
npm install -D jest@29.7.0 babel-jest@29.7.0

# Lote 5
npm install -D webpack@5.107.2 webpack-dev-server@4.15.2

# Lote 7
npm uninstall babel-core babel-loader babel-plugin-transform-async-to-generator babel-plugin-transform-runtime babel-polyfill babel-preset-env babel-preset-es2015 babel-preset-stage-0 @types/babel-core @vercel/node phaser3-rex-plugins

# Pós-limpeza (sem --force)
npm audit fix
```

**Não executado:** `npm audit fix --force`

---

## Resultados de validação

### Build

```
npm run build
```

**Resultado:** OK — `webpack 5.107.2 compiled with 4 warnings` (mode não definido, tamanho de bundle — pré-existentes)

### Testes

```
npm test
```

**Resultado:** Parcial — 1 suite passou (`mockAPI.test.js`), 2 falharam

| Suite | Status | Causa provável |
|-------|--------|----------------|
| mockAPI.test.js | PASS | — |
| mockLocalStorage.test.js | FAIL | `localStorage is not defined` — falta mock/setup Jest |
| mockGame.test.js | FAIL | `HTMLVideoElement is not defined` — Phaser em Node sem polyfill |

**Nota:** falhas pré-existentes ao upgrade; não introduzidas pelos lotes aplicados.

### Lint

```
npx eslint src/
```

**Resultado:** FAIL — `ESLint couldn't find the config "node"` — `eslint-config-node` ausente (pré-existente)

### Audit final

```
npm audit
```

**Resultado:** 23 vulnerabilities (22 moderate, 1 high)

---

## Vulnerabilidades restantes

| Pacote / cadeia | Severidade | Fix disponível | Requer |
|-----------------|------------|----------------|--------|
| js-yaml (via Jest/babel-jest) | moderate | `--force` → jest downgrade | jest 30 ou override — Grupo B |
| serialize-javascript (via copy-webpack-plugin) | high | `--force` → copy-webpack-plugin@14 | Major upgrade — Grupo B |
| uuid (via webpack-dev-server/sockjs) | moderate | `--force` → webpack-dev-server@5 | Major upgrade — Grupo B |

---

## Commits sugeridos

```bash
# Dependências de baixo risco + limpeza
git add package.json package-lock.json docs/DEPENDENCY_UPGRADE_PLAN.md docs/SECURITY_UPDATES.md
git commit -m "fix: update low-risk dependencies and remove legacy Babel 6 packages"

# Plano de migração (se docs forem commitados separadamente)
git add docs/DEPENDENCY_UPGRADE_PLAN.md
git commit -m "docs: document major dependency upgrade plan"
```

**Nota:** `dist/app.js` e `dist/production-dependencies.js` foram regenerados pelo build. Avaliar se devem entrar no mesmo commit ou em commit separado.

---

## Rodada 2026-09-03

**Data:** 2026-09-03

### Resumo

| Métrica | Antes | Depois |
|---------|------:|-------:|
| Total vulnerabilidades | 6 | 0 |
| High | 3 | 0 |
| Moderate | 3 | 0 |

### Correções

| Método | Detalhe |
|--------|---------|
| `npm audit fix` (sem `--force`) | `browserslist` ≥4.28.8, `nanoid` ≥3.3.18, `fast-uri` ≥3.1.7 |
| Override `qs` | `qs@^6.16.0` em `package.json` — evita Express 5 (`npm audit fix --force`) |
| Override existente | `js-yaml@^4.2.0` mantido |
| App | `sanitizePlayerName` em `src/boardGold.js` + uso em `gameOverScene.js` (trim, remove control chars, máx. 10) |

### Validação

| Check | Resultado |
|-------|-----------|
| `npm audit` | 0 vulnerabilities |
| `npm run build` | OK (warnings pré-existentes de tamanho/mode) |
| `npm test` | `mockAPI.test.js` PASS; falhas pré-existentes em localStorage/Phaser |

### Residual (fora desta rodada)

- Plugins rex carregados via CDN em `PreloaderScene.js` (supply chain)
- Ranking sem autenticação (esperado para o jogo casual)
- Migração Express 5 não necessária enquanto o override de `qs` cobrir o audit

