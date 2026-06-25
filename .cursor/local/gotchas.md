# Gotchas — bugs e armadilhas conhecidas

Lista para o agente não repetir erros ou fazer suposições erradas.

## Resolvidos

- [x] `api/server.js` — catch-all aponta para `../dist/index.html`
- [x] `vercel.json` — deploy somente estático, sem `server.js` inexistente
- [x] `dist/index.html` — `<div id="divId">` adicionado; `entry.js` e `main.js` removidos
- [x] PreGameScene — tweens com `destroy()` correto e refs distintas
- [x] CreditsScene — tweens com `destroy()` correto
- [x] `ready()` mortos removidos de Title, Game, gameOver, Board
- [x] GameScene — estado em `this.*` (reseta ao reiniciar cena)
- [x] Model — `_soundOn` inicializado no constructor
- [x] `test/mocks/` — `styleMock.js` e `fileMock.js` criados
- [x] API tests — `node-fetch` mockado, sem chamadas live

## Pendentes

### initGame() nunca chamado
`boardGold.js` exporta `initGame()` mas game ID `91a9adf7a98b4b8490c6689a10fedb2f` está hardcoded. Não é bug — funciona assim.

### soundOn sem UI
`_soundOn` inicializado, mas Options só controla música — sem toggle de SFX.

### Testes legados ainda falham
- `mockLocalStorage.test.js` — `localStorage` não definido no ambiente Jest (sem jsdom)
- `mockGame.test.js` — `HTMLVideoElement` não definido ao importar Phaser

## Suposições erradas comuns

| Errado | Correto |
|--------|---------|
| `api/server.js` é backend de scores | Só serve arquivos estáticos |
| Score fica no Model | Score fica em `this.gold` + localStorage |
| Precisa rodar initGame() | Game ID já está hardcoded |
| Assets ficam em src/assets/ | Assets ficam em `dist/assets/` (imagens + Theme.mp3) |
