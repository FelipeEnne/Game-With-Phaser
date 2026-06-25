# Climbing the Volcano — visão geral

## O que é

Jogo 2D estilo Mario feito com **Phaser 3**. O jogador coleta moedas enquanto foge do fogo do vulcão. Projeto capstone da Microverse.

**Objetivo do jogador:** coletar o máximo de gold possível; ao ser atingido pelo fogo, enviar o score para o ranking top 10.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Engine | Phaser 3.60 |
| Bundle | Webpack 5 |
| Dev server | Express (`api/server.js`, porta 8080) |
| Testes | Jest + babel-jest + jest-canvas-mock |
| Deploy | Vercel (static `dist/`) |
| Leaderboard | API externa Firebase (Microverse) — **não** é `api/server.js` |

## Estrutura de pastas

```
src/
  index.js              # bootstrap Phaser, registra cenas
  Model.js              # estado de áudio compartilhado
  boardGold.js          # API remota de scores
  localStorage.js       # persistência local de gold
  Config/config.js      # config Phaser (800x600, physics)
  Scenes/               # 9 cenas do jogo
  Objects/Button.js     # botão reutilizável com transição de cena
  assets/style/         # CSS global
api/server.js           # servidor estático local (serve dist/)
test/                   # testes Jest
dist/                   # build (pode estar desatualizado no repo)
webpack.config.js
vercel.json
```

## Fluxo resumido das cenas

```
Boot → Preloader → Title → PreGame → Game → gameOver → Board
                  ↓         ↓
               Options   Credits
```

## Comandos

```bash
npm start           # Express em localhost:8080
npm run build       # webpack → dist/app.js + production-dependencies.js
npm run watch       # webpack em modo watch
npm test            # Jest
npm run jest-watch  # Jest watch
npm run npx-fix     # eslint --fix em src/
```

## Links

- Live: https://climbing-the-volcano-k1kdpckj8-felipeenne.vercel.app/
- Repo: https://github.com/FelipeEnne/Game-With-Phaser

## Importante

- **Scores não passam pelo Express.** O browser chama diretamente a API Firebase via `src/boardGold.js`.
- **`api/server.js`** só serve arquivos estáticos de `dist/` para desenvolvimento local.
