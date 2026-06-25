# TODO Legado — Climbing the Volcano

Lista de dívidas técnicas, riscos e oportunidades de melhoria identificadas na análise inicial. Nenhum item abaixo foi implementado — serve como backlog para retomada do projeto.

---

## Alta prioridade

### Assets de imagem e áudio ausentes do repositório
- **Descrição:** `PreloaderScene.js` referencia dezenas de arquivos em `assets/images/` e `assets/music/`, mas apenas `src/assets/style/style.css` existe no repo. Sem assets, o jogo não funciona localmente.
- **Arquivos afetados:** `src/Scenes/PreloaderScene.js`, `dist/`
- **Ação sugerida:** Recuperar assets de deploy online ou branch histórica; configurar Webpack para copiar `src/assets/` → `dist/assets/`.

### API externa com ID hardcoded e possível indisponibilidade
- **Descrição:** Game ID `91a9adf7a98b4b8490c6689a10fedb2f` está fixo em `src/boardGold.js`. A API da Microverse pode ser descontinuada.
- **Arquivos afetados:** `src/boardGold.js`, `test/mockAPI.js`
- **Ação sugerida:** Externalizar configuração; avaliar viabilidade da API; planejar fallback ou backend próprio.

### Webpack sem transpilação nem cópia de assets
- **Descrição:** `webpack.config.js` não usa `babel-loader`, `CopyWebpackPlugin` nem `HtmlWebpackPlugin`, apesar de estarem nas dependências. Build a partir de `src/` pode falhar ou gerar bundle incompleto.
- **Arquivos afetados:** `webpack.config.js`
- **Ação sugerida:** Completar configuração Webpack ou documentar que apenas `dist/` pré-compilado deve ser usado.

### `dist/` versionado e potencialmente dessincronizado
- **Descrição:** Build de produção está no Git com alterações pendentes em `src/`. Risco de deploy com código desatualizado.
- **Arquivos afetados:** `dist/app.js`, múltiplos `src/Scenes/*.js`
- **Ação sugerida:** Adicionar `dist/` ao `.gitignore` e gerar build no CI/deploy.

---

## Média prioridade

### Duplicação de código de API
- **Descrição:** `src/boardGold.js` e `test/mockAPI.js` são quase idênticos. Alterações precisam ser feitas em dois lugares.
- **Ação sugerida:** Testar `src/boardGold.js` diretamente mockando `fetch` global.

### `initGame()` morto em produção
- **Descrição:** Função para criar novo jogo na API existe e é testada, mas nunca é chamada. Produção depende de ID fixo.
- **Arquivos afetados:** `src/boardGold.js`
- **Ação sugerida:** Integrar no bootstrap ou remover se ID fixo for intencional.

### Plugins Rex carregados via CDN em vez do npm
- **Descrição:** `phaser3-rex-plugins` está no `package.json`, mas Preloader carrega scripts de `raw.githubusercontent.com`. Frágil e dependente de internet.
- **Arquivos afetados:** `src/Scenes/PreloaderScene.js`, `package.json`
- **Ação sugerida:** Importar plugins do pacote npm ou bundlar localmente.

### README desatualizado
- **Descrição:** Instrui `node server.js` (caminho incorreto), não menciona `npm run build`, links Heroku possivelmente mortos.
- **Arquivos afetados:** `README.md`
- **Ação sugerida:** Atualizar instruções de setup e links de deploy.

### Múltiplas configurações Babel conflitantes
- **Descrição:** Coexistem `.babelrc`, `babel.config.js` e `babelrc.js` com presets diferentes (v6 e v7, React preset sem React no projeto).
- **Arquivos afetados:** `.babelrc`, `babel.config.js`, `babelrc.js`, `package.json`
- **Ação sugerida:** Consolidar em um único `babel.config.js`.

### Dependências Babel legadas
- **Descrição:** `babel-core@4`, `babel-preset-es2015`, `babel-preset-stage-0` coexistem com Babel 7. Risco de conflitos e vulnerabilidades.
- **Ação sugerida:** Remover pacotes v6 não utilizados; auditar com `npm audit`.

### Opções de áudio não persistem
- **Descrição:** `Model.js` guarda preferências apenas em memória. Recarregar a página reseta música.
- **Arquivos afetados:** `src/Model.js`, `src/Scenes/OptionsScene.js`
- **Ação sugerida:** Persistir em `localStorage` se desejado.

### Nomenclatura inconsistente de cenas
- **Descrição:** `gameOverScene.js` usa camelCase; demais cenas usam PascalCase (`TitleScene.js`, etc.).
- **Ação sugerida:** Renomear para `GameOverScene.js` em refactor futuro.

### HTML DOM misturado com Phaser no Game Over
- **Descrição:** `gameOverScene` usa `document.createElement` em vez do plugin Rex InputText já carregado.
- **Ação sugerida:** Unificar abordagem de UI (tudo Phaser ou tudo DOM).

### Sem validação robusta de input no ranking
- **Descrição:** Apenas verifica nome não vazio. Sem sanitização, limite de caracteres efetivo ou feedback de erro da API.
- **Arquivos afetados:** `src/Scenes/gameOverScene.js`
- **Ação sugerida:** Validar tamanho, caracteres permitidos e tratar erros de rede.

### Cobertura de testes limitada
- **Descrição:** Testes cobrem localStorage, API mockada e instanciação do jogo. Nenhum teste de gameplay, cenas ou física.
- **Arquivos com teste:** `test/mockAPI.test.js`, `test/mockLocalStorage.test.js`, `test/mockGame.test.js`
- **Arquivos sem teste:** Todas as Scenes, `boardGold.js` (produção), `Button.js`, `GameScene.js`

---

## Baixa prioridade

### `soundOn` no Model nunca é usado
- **Descrição:** `Model.js` define `soundOn` mas OptionsScene só controla música, não efeitos sonoros.
- **Ação sugerida:** Implementar toggle de SFX ou remover propriedade.

### Timeout arbitrário no Preloader
- **Descrição:** `delayedCall(3000, this.ready)` pode iniciar o jogo antes dos assets carregarem em conexões lentas.
- **Arquivos afetados:** `src/Scenes/PreloaderScene.js`
- **Ação sugerida:** Confiar apenas no evento `complete` do loader.

### Código comentado de debug no Preloader
- **Descrição:** Linhas comentadas para pular direto para cenas específicas.
- **Ação sugerida:** Remover ou mover para flag de debug.

### CSS com typo e ponto duplo
- **Descrição:** `.intruction` (falta "s"), `aliceblue;;` com ponto duplo em `style.css`.
- **Arquivos afetados:** `src/assets/style/style.css`, `dist/index.html`

### Meta tags com typo no HTML
- **Descrição:** `poperty` em vez de `property` nas meta tags Open Graph.
- **Arquivos afetados:** `dist/index.html`

### `@vercel/node` possivelmente não utilizado
- **Descrição:** Dependência de produção declarada, mas `vercel.json` usa apenas `@vercel/static`.
- **Ação sugerida:** Remover dependência se confirmado não uso.

### `webpack-dev-server` instalado mas sem script
- **Descrição:** Pacote nas devDependencies sem script `dev` no `package.json`.
- **Ação sugerida:** Adicionar script ou remover dependência.

### Stickler CI configurado mas sem pipeline local
- **Descrição:** `.stickler.yml` referencia ESLint; não há GitHub Actions ou similar no repo.
- **Ação sugerida:** Adicionar CI moderno (GitHub Actions) ou remover config morta.

### Falta de Prettier / formatação automática
- **Descrição:** Apenas ESLint configurado, sem padronização de formatação.
- **Ação sugerida:** Adicionar Prettier com config mínima se equipe crescer.

### Futuro mencionado no README
- **Descrição:** "Create a boss who will give you many coins" — feature nunca implementada.
- **Ação sugerida:** Manter como backlog de gameplay.

### Melhorias de DX
- **Descrição:** Falta script `dev` unificado, hot reload, e documentação inline.
- **Ação sugerida:** Agora parcialmente resolvido com pasta `docs/` e regras `.cursor/rules/`.

### Oportunidades de refatoração em GameScene
- **Descrição:** Arquivo com ~290 linhas, lógica de plataformas repetida 5 vezes, variáveis `logicPlatforms1-5`.
- **Arquivos afetados:** `src/Scenes/GameScene.js`
- **Ação sugerida:** Extrair array de plataformas e loop no refactor futuro.

### Git: alterações locais não commitadas
- **Descrição:** Branch `development` com 7 commits à frente do origin e arquivos modificados em `src/` e testes.
- **Ação sugerida:** Revisar diff, commitar ou descartar antes de continuar desenvolvimento.

---

## Riscos de segurança

| Risco | Prioridade | Detalhe |
|-------|------------|---------|
| Ranking aberto sem autenticação | Baixa | Esperado para jogo casual; permite scores falsos |
| CDN externo para plugins | Média | Supply chain risk se URL for comprometida |
| Sem sanitização de nome no ranking | Baixa | Nome exibido truncado; possível XSS se API não sanitizar |
| Sem `.env` com secrets | N/A | Projeto não usa secrets — positivo |
| Dependências antigas | Média | Executar `npm audit` e atualizar |

---

## Resumo por prioridade

| Prioridade | Quantidade |
|------------|------------|
| Alta | 4 |
| Média | 11 |
| Baixa | 12 |
