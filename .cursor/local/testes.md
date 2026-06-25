# Testes

## Configuração Jest (`package.json`)

| Setting | Valor |
|---------|-------|
| Transform | `babel-jest` para `.js`/`.jsx` |
| Setup | `jest-canvas-mock` |
| CSS mock | `test/mocks/styleMock.js` |
| Asset mock | `test/mocks/fileMock.js` |

**Problema:** pasta `test/mocks/` **não existe** no repo — imports de CSS/imagens em testes podem falhar.

## Suites existentes

| Arquivo | Testa | Testes |
|---------|-------|--------|
| `mockAPI.test.js` | `submitGold`, `getGoldBoard`, `initGame` | 3 |
| `mockGame.test.js` | Instanciação Phaser Game | ~2 |
| `mockLocalStorage.test.js` | `localStoreGold`, `getLocalGolds`, `storeGolds` | ~3 |

**Total:** ~8 testes em 3 suites.

## Mocks duplicados

Os arquivos em `test/` são cópias dos módulos de `src/`:

| Mock | Original |
|------|----------|
| `test/mockAPI.js` | `src/boardGold.js` (usa `node-fetch`) |
| `test/mockLocalStorage.js` | `src/localStorage.js` |
| `test/mockGame.js` | `src/index.js` (wiring Phaser) |

`mockAPI.js` difere do original: usa `node-fetch` em vez de `fetch` global.

## API tests — integração live

`mockAPI.test.js` chama a **API real** da Microverse:

```javascript
submitGold("Best", 300)  // POST real → side effect no leaderboard
getGoldBoard()           // GET real
initGame()               // POST real → cria jogo na API
```

Sem mocks, sem isolamento. Frágil e com efeitos colaterais.

## Lacunas de cobertura

**Sem testes para:**

- Todas as 9 cenas (`src/Scenes/*`)
- `src/Model.js`
- `src/Objects/Button.js`
- `src/boardGold.js` (diretamente — só via mock duplicado)
- `api/server.js`
- `webpack.config.js`
- Fluxo integrado score (Game → localStorage → gameOver → boardGold)

## Babel

- `babel.config.js` — `@babel/preset-env` para Node (Jest)
- `.babelrc` — presets adicionais incluindo env `jest`

## CI

Nenhum workflow `.github/workflows` encontrado.

## Melhorias sugeridas (Fase 2 — um commit por vez)

1. Criar `test/mocks/styleMock.js` e `fileMock.js`
2. Mockar fetch nos testes de API (sem bater na API live)
3. Testes unitários para `localStorage.js` e `boardGold.sorting()`
4. Testes de cena (requer setup Phaser mais elaborado)
