# Mapa do Projeto — Climbing the Volcano

## Propósito

**Climbing the Volcano** é um jogo de plataforma estilo Mario, desenvolvido como projeto capstone do curso de JavaScript da Microverse. O jogador controla um personagem, coleta moedas (gold) em plataformas móveis e tenta escapar das bolas de fogo lançadas pelo vulcão. Ao morrer, pode enviar a pontuação para um ranking online (Top 10).

Repositório original: [FelipeEnne/Game-With-Phaser](https://github.com/FelipeEnne/Game-With-Phaser.git)

## Stack principal

| Camada | Tecnologia |
|--------|------------|
| Linguagem | JavaScript (ES6+ modules) |
| Game engine | Phaser 3 (`phaser@^3.60.0`) |
| Bundler | Webpack 5 |
| Transpilação | Babel 7 (configurações múltiplas — ver riscos) |
| Servidor local | Express 4 (`api/server.js`) |
| Testes | Jest 29 + jest-canvas-mock |
| Lint | ESLint 8 |
| Deploy | Vercel (estático via `dist/`) |

## Estrutura de pastas

```
Game-With-Phaser/
├── api/                    # Servidor Express mínimo (serve dist/)
├── dist/                   # Build de produção (HTML + JS bundle)
├── src/                    # Código-fonte do jogo
│   ├── Config/             # Configuração do Phaser
│   ├── Objects/            # Componentes reutilizáveis (Button)
│   ├── Scenes/             # Cenas do jogo (fluxo principal)
│   ├── assets/style/       # CSS (imagens/áudio referenciados mas ausentes no repo)
│   ├── boardGold.js        # Integração com API de leaderboard
│   ├── localStorage.js     # Persistência local de pontuação
│   ├── Model.js            # Estado global (áudio/opções)
│   └── index.js            # Ponto de entrada do jogo
├── test/                   # Testes Jest e mocks
├── docs/                   # Documentação do projeto (esta pasta)
├── webpack.config.js
├── package.json
├── vercel.json
└── README.md
```

## Principais módulos

### `src/index.js`
Ponto de entrada da aplicação. Instancia `Phaser.Game`, registra todas as cenas e inicia em `Boot`.

### `src/Scenes/`
Cada arquivo representa uma cena Phaser com responsabilidade de UI ou gameplay:

| Cena | Arquivo | Responsabilidade |
|------|---------|------------------|
| Boot | `BootScene.js` | Redireciona para Preloader |
| Preloader | `PreloaderScene.js` | Carrega assets, plugins Rex e barra de progresso |
| Title | `TitleScene.js` | Menu principal (Play, Options, Credits) |
| Options | `OptionsScene.js` | Liga/desliga música de fundo |
| Credits | `CreditsScene.js` | Créditos com animação |
| PreGame | `PreGameScene.js` | Introdução narrativa antes do jogo |
| Game | `GameScene.js` | Gameplay principal (física, moedas, fogo) |
| gameOver | `gameOverScene.js` | Tela de fim de partida + envio de score |
| Board | `BoardScene.js` | Ranking Top 10 via API externa |

### `src/boardGold.js`
Cliente HTTP para a API pública do capstone Microverse (Google Cloud Functions). Funções: `submitGold`, `getGoldBoard`, `initGame`.

### `src/localStorage.js`
Armazena pontuação da partida em `localStorage` (chave `golds`) entre Game Over e envio ao ranking.

### `src/Model.js`
Modelo simples de preferências de áudio (`musicOn`, `soundOn`, `bgMusicPlaying`), compartilhado via `game.globals`.

### `api/server.js`
Servidor Express que serve arquivos estáticos de `dist/` na porta `8080` (ou `PORT`).

## Arquivos mais importantes

| Arquivo | Por que é crítico |
|---------|-------------------|
| `src/index.js` | Bootstrap do jogo e registro de cenas |
| `src/Scenes/GameScene.js` | Toda a lógica de gameplay |
| `src/Scenes/PreloaderScene.js` | Lista completa de assets e plugins externos |
| `src/boardGold.js` | Integração com ranking online |
| `webpack.config.js` | Define como o bundle é gerado |
| `dist/index.html` | HTML servido em produção |
| `api/server.js` | Único servidor backend local |
| `package.json` | Scripts, dependências e config Jest |

## Dependências relevantes

### Produção
- `phaser` — engine do jogo
- `phaser3-rex-plugins` — declarado no `package.json`, mas plugins Rex são carregados via CDN no Preloader
- `express` — servidor estático
- `@vercel/node` — A confirmar uso ativo (deploy atual parece estático via `vercel.json`)
- `node-fetch` — usado nos testes de API (`test/mockAPI.js`)

### Desenvolvimento
- `webpack`, `webpack-cli`, `webpack-dev-server`
- `babel-*` (múltiplas versões e presets legados coexistindo)
- `jest`, `babel-jest`, `jest-canvas-mock`
- `eslint`, `eslint-plugin-import`

## Scripts npm

| Script | Comando | Descrição |
|--------|---------|-----------|
| `start` | `node api/server.js` | Sobe servidor local na porta 8080 |
| `build` | `webpack` | Gera bundles em `dist/` |
| `watch` | `webpack --watch` | Rebuild contínuo |
| `test` | `jest` | Executa testes |
| `jest-watch` | `jest --watch` | Testes em modo watch |
| `npx-fix` | `npx eslint src/ --fix` | Lint com auto-fix |
| `install-web` | `npm install --force --save-dev webpack` | Script legado de instalação |

## Visão geral para novos desenvolvedores

1. O projeto é um **jogo browser-side** com Phaser 3, empacotado por Webpack e servido estaticamente.
2. Não há banco de dados local — o ranking usa uma **API externa** hospedada na Microverse.
3. O fluxo de cenas segue o padrão clássico de tutoriais Phaser: Boot → Preloader → Title → ... → Game → gameOver → Board.
4. A pasta `dist/` contém o build pronto; `src/` é o código-fonte.
5. **Atenção:** assets de imagem e áudio referenciados no Preloader **não estão presentes** no repositório local analisado — apenas `src/assets/style/style.css` existe. Sem esses arquivos em `dist/assets/`, o jogo não carrega corretamente.
6. O README original está desatualizado em relação ao caminho do servidor (`node server.js` vs `npm start` / `api/server.js`).

## Pontos de entrada

| Entrada | Local |
|---------|-------|
| Aplicação web | `dist/index.html` → carrega `app.js` |
| Código-fonte do jogo | `src/index.js` |
| Servidor local | `api/server.js` |
| Testes | `test/*.test.js` |

## O que não existe neste projeto

- Autenticação / login de usuários
- Banco de dados local
- ORM ou migrations
- Arquivo `.env` (apenas `process.env.PORT` no servidor)
- Docker
- CI configurado localmente (há `.stickler.yml` para Stickler CI)
