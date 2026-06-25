# Dependency Upgrade Plan

Plano de atualização de dependências do projeto **Climbing the Volcano** (Game-With-Phaser).

**Última atualização:** 2026-06-24  
**Gerenciador:** npm + `package-lock.json`  
**Node engines:** `18.x` (ambiente local usado na validação: v22.22.0)

---

## Stack detectada

| Camada | Tecnologia |
|--------|------------|
| Framework | Phaser 3.60 |
| Build | Webpack 5.107.2 |
| Transpilação (testes) | Babel 7 via `babel.config.js` + `babel-jest` |
| Servidor | Express 4.22.2 |
| Testes | Jest 29.7.0 |
| Lint | ESLint 8.40.0 |
| Deploy | Vercel static (`vercel.json`) |

---

## Resumo do progresso

| Métrica | Antes | Depois |
|---------|------:|-------:|
| Vulnerabilidades (`npm audit`) | 83 | 23 |
| Critical | 37 | 0 |
| Pacotes auditados | ~1182 | ~863 |

---

## Lotes aplicados (Grupo A)

### Lote 1 — patch/minor utilitários

| Pacote | Antes | Depois |
|--------|------:|-------:|
| node-fetch | 3.3.1 | 3.3.2 |
| jest-canvas-mock | 2.5.0 | 2.5.2 |
| html-webpack-plugin | 5.5.1 | 5.6.7 |
| eslint-plugin-import | 2.27.5 | 2.32.0 |
| css-loader | 6.7.3 | 6.11.0 |
| style-loader | 3.3.2 | 3.3.4 |

### Lote 2 — Express

| Pacote | Antes | Depois |
|--------|------:|-------:|
| express | 4.18.2 | 4.22.2 |

### Lote 3 — Babel 7

| Pacote | Antes | Depois |
|--------|------:|-------:|
| @babel/core | 7.21.8 | 7.29.7 |
| @babel/preset-env | 7.21.5 | 7.29.7 |
| @babel/plugin-transform-runtime | 7.21.4 | 7.29.7 |
| @babel/runtime | 7.21.5 | 7.29.7 |

### Lote 4 — Jest

| Pacote | Antes | Depois |
|--------|------:|-------:|
| jest | 29.5.0 | 29.7.0 |
| babel-jest | 29.5.0 | 29.7.0 |

### Lote 5 — Webpack

| Pacote | Antes | Depois |
|--------|------:|-------:|
| webpack | 5.82.1 | 5.107.2 |
| webpack-dev-server | 4.15.0 | 4.15.2 |

### Lote 7 — Remoção de dependências mortas

**Removidos de `devDependencies`:**

- `babel-core`, `babel-loader`, `babel-polyfill`
- `babel-preset-env`, `babel-preset-es2015`, `babel-preset-stage-0`
- `babel-plugin-transform-async-to-generator`, `babel-plugin-transform-runtime`
- `@types/babel-core`

**Removidos de `dependencies`:**

- `@vercel/node` — não usado em `vercel.json` (deploy estático)
- `phaser3-rex-plugins` — plugins Rex carregados via CDN em `PreloaderScene.js`

**Impacto:** eliminou ~37 vulnerabilidades critical da cadeia Babel 6.

---

## Pacotes seguros pendentes (Grupo A — próximos lotes)

| Pacote | Atual | Alvo sugerido | Notas |
|--------|------:|--------------:|-------|
| eslint | 8.40.0 | 8.57.1 | Última v8; baixo risco |
| phaser | 3.60.0 | 3.90.0 | Minor 3.x — testar gameplay manualmente |

---

## Pacotes de alto impacto (Grupo B)

Não atualizar automaticamente. Planos individuais abaixo.

### eslint 8 → 9/10

- **Versão atual:** 8.40.0  
- **Versão recomendada (curto prazo):** 8.57.1  
- **Versão recomendada (longo prazo):** 9.x ou 10.x com flat config  
- **Por que precisa atualizar:** suporte, correções de segurança em dependências  
- **Breaking change:** ESLint 9+ exige `eslint.config.js` (flat config); `extends: "node"` falha hoje — falta `eslint-config-node` no `package.json`  
- **Arquivos afetados:** `.eslintrc.json`, `package.json`  
- **Risco:** médio  
- **Benefício:** lint funcional + segurança  
- **Plano de migração:** (1) instalar `eslint-config-node` ou migrar para flat config; (2) subir para 8.57.1; (3) depois migrar para ESLint 9+  
- **Como testar:** `npx eslint src/`  
- **Quando:** após estabilizar dependências de build

### jest 29 → 30

- **Versão atual:** 29.7.0  
- **Versão recomendada:** 30.x  
- **Por que precisa atualizar:** ciclo de vida, js-yaml transitivo  
- **Breaking change:** possíveis mudanças de config ESM e APIs internas  
- **Arquivos afetados:** `package.json` (jest config), testes  
- **Risco:** médio  
- **Benefício:** corrige cadeia js-yaml via Jest (requer `--force` hoje)  
- **Plano de migração:** seguir [Jest 30 migration guide](https://jestjs.io/docs/upgrading-to-jest30); corrigir testes quebrados (localStorage, HTMLVideoElement) antes  
- **Como testar:** `npm test`  
- **Quando:** depois de corrigir ambiente de testes

### webpack-dev-server 4 → 5

- **Versão atual:** 4.15.2  
- **Versão recomendada:** 5.2.5  
- **Por que precisa atualizar:** uuid/sockjs vulnerável (moderate)  
- **Breaking change:** config de dev server, middleware  
- **Arquivos afetados:** `webpack.config.js` (se dev server for configurado)  
- **Risco:** médio  
- **Benefício:** corrige uuid transitivo  
- **Plano de migração:** revisar [webpack-dev-server v5 changelog](https://github.com/webpack/webpack-dev-server/releases)  
- **Como testar:** `webpack serve` ou script watch  
- **Quando:** se dev server for usado ativamente no dia a dia

### copy-webpack-plugin 11 → 14

- **Versão atual:** 11.0.0  
- **Versão recomendada:** 14.0.0  
- **Por que precisa atualizar:** serialize-javascript (high)  
- **Breaking change:** API do plugin, peer deps webpack  
- **Arquivos afetados:** `webpack.config.js` (se plugin for usado — **A confirmar** uso atual)  
- **Risco:** médio  
- **Benefício:** elimina 1 advisory high  
- **Plano de migração:** atualizar plugin + validar build  
- **Como testar:** `npm run build`  
- **Quando:** lote dedicado após webpack estável

### phaser 3 → 4

- **Versão atual:** 3.60.0  
- **Versão recomendada:** manter 3.x; 4.x somente com pedido explícito  
- **Por que precisa atualizar:** apenas se quiser framework novo  
- **Breaking change:** API Phaser, física, cenas — reescrita ampla  
- **Arquivos afetados:** `src/Scenes/*`, `src/Config/config.js`, assets  
- **Risco:** muito alto  
- **Benefício:** features Phaser 4  
- **Plano de migração:** não iniciar sem decisão de produto  
- **Como testar:** gameplay completo + build  
- **Quando:** **depois** — decisão documentada em `.cursor/local/decisoes.md`

### express 4 → 5

- **Versão atual:** 4.22.2  
- **Versão recomendada:** manter 4.x  
- **Por que precisa atualizar:** ciclo de vida futuro  
- **Breaking change:** routing, middleware, path matching  
- **Arquivos afetados:** `api/server.js`  
- **Risco:** baixo-médio (servidor mínimo)  
- **Benefício:** modernização  
- **Plano de migração:** seguir [Express 5 migration guide](https://expressjs.com/en/guide/migrating-5.html)  
- **Como testar:** `npm start` + navegar rotas  
- **Quando:** opcional, baixa prioridade

### Node engines 18 → 22

- **Versão atual (engines):** 18.x  
- **Ambiente local:** 22.22.0  
- **Por que precisa atualizar:** alinhar engines com ambiente real  
- **Breaking change:** possível incompatibilidade com ferramentas legadas  
- **Arquivos afetados:** `package.json` engines, CI (quando existir)  
- **Risco:** baixo para este projeto  
- **Benefício:** elimina `EBADENGINE` warnings  
- **Plano de migração:** validar build/testes em Node 22; atualizar `engines`  
- **Como testar:** `npm test`, `npm run build`  
- **Quando:** após CI definido

### @babel/* 7 → 8

- **Versão atual:** 7.29.7  
- **Versão recomendada:** manter 7.x até Jest/Babel ecosystem estabilizar  
- **Breaking change:** major Babel  
- **Arquivos afetados:** `babel.config.js`, Jest  
- **Risco:** alto  
- **Quando:** muito depois

---

## Ordem recomendada de migração (Grupo B)

1. Corrigir ambiente de testes (localStorage mock, HTMLVideoElement para Phaser)
2. eslint 8.57.1 + `eslint-config-node`
3. Alinhar Node engines (18 LTS ou 22)
4. phaser 3.60 → 3.90 (minor, teste manual)
5. copy-webpack-plugin 14 (se usado)
6. webpack-dev-server 5 (se dev server ativo)
7. jest 30
8. eslint 9/10
9. express 5 (opcional)
10. phaser 4 (somente com pedido explícito)

---

## Riscos conhecidos

- **ESLint quebrado:** `extends: "node"` sem `eslint-config-node` instalado — pré-existente  
- **Testes falhando:** `mockLocalStorage.test.js` (sem `localStorage`), `mockGame.test.js` (`HTMLVideoElement`) — pré-existentes, não causados pelos upgrades  
- **`npm audit fix --force`:** não usar — puxaria jest 25, copy-webpack-plugin 14, webpack-dev-server 5 com breaking changes

---

## Próximos passos

1. Commitar `package.json` + `package-lock.json` + docs (ver `SECURITY_UPDATES.md`)
2. Decidir se `dist/` rebuild entra no commit (atualmente versionado)
3. Corrigir testes (localStorage / Phaser mocks) em commit separado
4. Lote eslint 8.57.1 + eslint-config-node
5. Avaliar phaser 3.90.0 com teste manual do jogo
