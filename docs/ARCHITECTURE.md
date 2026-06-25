# Arquitetura — Climbing the Volcano

## Visão geral

O projeto segue uma arquitetura **cliente pesado + servidor estático mínimo + API externa**:

```
┌─────────────────────────────────────────────────────────────┐
│                        Navegador                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  dist/index.html + app.js (Phaser 3)                │   │
│  │  ├── Scenes (UI + gameplay)                         │   │
│  │  ├── Model (estado de áudio)                        │   │
│  │  ├── localStorage (score temporário)                │   │
│  │  └── boardGold.js → fetch() → API externa           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
          │                              │
          │ HTTP (local)                 │ HTTPS (produção)
          ▼                              ▼
┌──────────────────┐          ┌──────────────────────────────┐
│  Express         │          │  Microverse Capstone API     │
│  api/server.js   │          │  (Google Cloud Functions)    │
│  serve dist/     │          │  Leaderboard global          │
└──────────────────┘          └──────────────────────────────┘
```

## Camadas

### Frontend (jogo)
- **Tecnologia:** Phaser 3 com física Arcade
- **Localização:** `src/` (fonte) e `dist/` (build)
- **Padrão:** Scene-based architecture (padrão nativo do Phaser)
- **Estado global:** `game.globals` em `src/index.js` contém `model` e referência à música de fundo

### Backend local
- **Tecnologia:** Express 4
- **Responsabilidade única:** servir arquivos estáticos de `dist/` e fallback SPA (`*` → `index.html`)
- **Sem API própria:** o Express não expõe endpoints de negócio

### API externa (ranking)
- **Base URL:** `https://us-central1-js-capstone-backend.cloudfunctions.net/api/`
- **Endpoints usados:**
  - `POST /games/` — criar jogo (`initGame`, não chamado em produção)
  - `POST /games/{id}/scores/` — enviar pontuação
  - `GET /games/{id}/scores/` — listar ranking
- **Game ID fixo:** `91a9adf7a98b4b8490c6689a10fedb2f` (hardcoded em `src/boardGold.js`)

### Banco de dados
**Não há banco local.** Persistência:
- `localStorage` do navegador (pontuação da última partida)
- API externa da Microverse (ranking persistente)

### Workers / serviços externos
- Plugins Phaser Rex carregados em runtime via CDN GitHub (`raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/...`)
- Deploy estático na Vercel (`vercel.json`)

## Padrão arquitetural

O projeto adota o padrão **Scene Manager do Phaser 3**, com separação superficial:

| Responsabilidade | Onde fica |
|------------------|-----------|
| Configuração do engine | `src/Config/config.js` |
| Fluxo de telas | `src/Scenes/*.js` |
| Componente UI reutilizável | `src/Objects/Button.js` |
| Estado de preferências | `src/Model.js` |
| Integração HTTP | `src/boardGold.js` |
| Persistência local | `src/localStorage.js` |
| Gameplay e regras de pontuação | `src/Scenes/GameScene.js` |

Não há camada de serviços, repositórios ou injeção de dependências — padrão típico de projetos capstone/tutorial.

## Comunicação entre módulos

```
index.js
  └── cria Model → game.globals.model
  └── registra cenas

TitleScene / OptionsScene
  └── lê/escreve game.globals.model (música)

GameScene
  └── storeGolds(score) → localStorage
  └── scene.start("gameOver")

gameOverScene
  └── getLocalGolds() ← localStorage
  └── submitGold(name, score) → API externa
  └── scene.start("Board")

BoardScene
  └── getGoldBoard() → API externa
  └── renderiza tabela Rex Grid Table
```

As cenas se comunicam principalmente via:
1. `this.scene.start("NomeDaCena")` — navegação
2. `this.sys.game.globals` — estado compartilhado
3. `localStorage` — pontuação entre cenas
4. `fetch` — API remota

## Onde ficam as regras de negócio

| Regra | Local |
|-------|-------|
| Coleta de moedas (+10 gold) | `GameScene.js` → `collectStar` |
| Spawn de fogo (1 fogo a cada 100 gold) | `GameScene.js` |
| Movimento de plataformas | `GameScene.js` → `update()` |
| Game over ao tocar fogo | `GameScene.js` → `hitfire` |
| Ordenação do ranking (desc por score) | `boardGold.js` → `sorting()` |
| Toggle de música | `OptionsScene.js` |
| Validação de nome antes de enviar score | `gameOverScene.js` (não vazio) |

## Integrações externas

| Integração | Tipo | Arquivo |
|------------|------|---------|
| Microverse Capstone API | REST (fetch) | `src/boardGold.js` |
| Rex plugins (input, grid table, scroller) | Script CDN | `src/Scenes/PreloaderScene.js` |
| Vercel | Hosting estático | `vercel.json` |
| Heroku | Hosting legado (link no README) | A confirmar se ainda ativo |

## Deploy

### Vercel
`vercel.json` configura build estático servindo `dist/**`. Não há serverless functions definidas no projeto atual.

### Local
`npm start` → Express na porta 8080 servindo `dist/`.

## Problemas arquiteturais identificados

### Alta relevância
1. **Assets ausentes no repositório** — Preloader referencia dezenas de imagens/áudios que não existem em `src/assets/` nem `dist/assets/`.
2. **ID de jogo hardcoded** — impossível trocar ambiente ou recriar jogo sem editar código.
3. **`initGame()` nunca é chamado** — função existe e é testada, mas produção usa ID fixo.
4. **Duplicação de código de API** — `src/boardGold.js` e `test/mockAPI.js` são cópias quase idênticas.

### Média relevância
5. **Plugins via CDN externo** — dependência de disponibilidade do GitHub raw; `phaser3-rex-plugins` no npm não é usado diretamente.
6. **Webpack incompleto** — sem `babel-loader`, sem cópia de assets, sem `HtmlWebpackPlugin` ativo no config atual.
7. **`dist/` versionado** — risco de dessincronia entre `src/` e build.
8. **HTML DOM misturado com Phaser** — `gameOverScene` usa `document.createElement` + `add.dom` em vez de plugin Rex InputText (carregado mas não usado aqui).

### Baixa relevância
9. **Nomenclatura inconsistente** — `gameOverScene` (camelCase) vs outras cenas em PascalCase.
10. **Múltiplas configs Babel** — `.babelrc`, `babel.config.js` e `babelrc.js` coexistem com presets conflitantes.

## Sugestões futuras (sem alterar código agora)

1. Centralizar configuração da API em um módulo `src/config/api.js` com variáveis de ambiente.
2. Mover assets para `src/assets/` e configurar Webpack para copiá-los ao build.
3. Unificar `boardGold.js` e `mockAPI.js` — mock apenas o `fetch` nos testes.
4. Adotar `webpack-dev-server` com hot reload para desenvolvimento.
5. Remover `dist/` do Git e gerar apenas no CI/deploy.
6. Substituir carregamento CDN dos plugins Rex por import do pacote npm já declarado.
7. Extrair lógica de gameplay de `GameScene.js` em funções/classes menores se o jogo crescer.
