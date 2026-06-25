# Setup Local — Climbing the Volcano

## Pré-requisitos

| Requisito | Versão |
|-----------|--------|
| Node.js | 18.x (definido em `package.json` → `engines`) |
| npm | Incluso com Node |
| Git | Para clonar o repositório |
| Navegador moderno | Chrome, Firefox ou Edge recomendados |

Não é necessário banco de dados, Docker ou arquivo `.env` para rodar localmente.

## Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/FelipeEnne/Game-With-Phaser.git
cd Game-With-Phaser

# 2. Instalar dependências
npm install
```

> **Nota:** O projeto contém dependências Babel legadas (presets da v6 coexistindo com v7). Se `npm install` falhar, investigar conflitos de peer dependencies antes de usar `--force`.

## Configuração de ambiente

### Variáveis de ambiente

O projeto **não utiliza arquivo `.env`**.

A única variável reconhecida é:

| Variável | Onde | Padrão | Descrição |
|----------|------|--------|-----------|
| `PORT` | `api/server.js` | `8080` | Porta do servidor Express |

Exemplo (opcional):

```bash
# PowerShell
$env:PORT = "3000"
npm start

# Bash
PORT=3000 npm start
```

### API externa (ranking)

A URL e o ID do jogo estão **hardcoded** em `src/boardGold.js`:

```
Base: https://us-central1-js-capstone-backend.cloudfunctions.net/api/
Game ID: 91a9adf7a98b4b8490c6689a10fedb2f
```

Não há configuração local para alterar isso sem editar o código-fonte.

## Build

Antes de rodar a partir do código-fonte, é necessário gerar o bundle:

```bash
npm run build
```

Isso executa Webpack e gera/atualiza:
- `dist/app.js`
- `dist/production-dependencies.js`

O arquivo `dist/index.html` **não é gerado automaticamente** pelo Webpack atual — ele já existe no repositório e deve ser mantido manualmente.

### Modo desenvolvimento (rebuild contínuo)

```bash
npm run watch
```

Em outro terminal:

```bash
npm start
```

## Subir localmente

```bash
# Opção recomendada
npm start

# Equivalente direto
node api/server.js
```

Abrir no navegador:

```
http://localhost:8080
```

> O README original menciona `node server.js`, mas o servidor está em `api/server.js`. Use `npm start`.

## Assets (imagens e áudio)

O Preloader (`src/Scenes/PreloaderScene.js`) espera assets em caminhos relativos como:

```
assets/images/menu/blue_button02.png
assets/images/sky.png
assets/images/redhairboy.png
assets/music/Theme.mp3
...
```

Esses arquivos devem estar acessíveis a partir de `dist/` quando o servidor estiver rodando (ex.: `dist/assets/images/...`).

**No repositório analisado, esses assets não estão presentes** — apenas `src/assets/style/style.css` existe. Sem os assets, o jogo exibirá erros de carregamento no console.

### Como resolver (A confirmar origem dos assets)

1. Verificar se existem em outra branch ou release do GitHub.
2. Baixar do deploy online (Vercel/Heroku) se ainda estiver ativo.
3. Recriar a partir dos créditos do README (Bevouliin, Pixabay, etc.).

## Banco de dados

Não aplicável. O projeto não usa banco local.

## Migrations / seeds

Não existem.

## Testes

```bash
npm test
```

Requisitos para testes:
- Jest com `jest-canvas-mock` (necessário para Phaser em ambiente Node)
- Testes de API usam mock de `node-fetch` (`test/mockAPI.test.js`)

## Lint

```bash
npm run npx-fix
# ou manualmente:
npx eslint src/
```

## Deploy online

### Vercel
O `vercel.json` serve arquivos de `dist/` estaticamente. Fluxo típico:

```bash
npm run build
# deploy dist/ via Vercel CLI ou integração Git
```

Link no README: https://climbing-the-volcano-k1kdpckj8-felipeenne.vercel.app/

### Heroku (legado)
README referencia: https://climbing-volcano.herokuapp.com/ — **A confirmar** se ainda está ativo.

## Problemas comuns

### Jogo não carrega / tela preta
- Verificar console do navegador por erros 404 de assets.
- Confirmar que `dist/assets/` contém imagens e áudio referenciados no Preloader.
- Confirmar que `npm run build` foi executado após alterações em `src/`.

### `npm start` não encontra arquivos
- O servidor serve `dist/`, não `src/`. Build obrigatório.

### Ranking não funciona
- A API da Microverse pode estar indisponível ou o game ID pode ter expirado.
- Verificar conectividade e resposta da API no DevTools → Network.

### Erros de módulo ES6 no build
- O `webpack.config.js` atual **não inclui `babel-loader`**. Se o build falhar com sintaxe moderna, pode ser necessário adicionar transpilação ou usar o `dist/` pré-compilado do repositório.

### Porta 8080 em uso
```bash
# PowerShell
$env:PORT = "3001"
npm start
```

### Testes falham por canvas
- Confirmar que `jest-canvas-mock` está em `setupFiles` no `package.json` (já configurado).

### Plugins Rex não carregam
- Dependem de acesso à internet (CDN GitHub). Ambientes offline ou com firewall bloqueando `raw.githubusercontent.com` falharão no Board (grid table).
