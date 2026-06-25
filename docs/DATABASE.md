# Banco de Dados — Climbing the Volcano

## Resumo

Este projeto **não possui banco de dados local**. Não há ORM, migrations, seeds ou conexão com PostgreSQL, MySQL, MongoDB ou similar.

## Persistência utilizada

### 1. localStorage (navegador)

| Aspecto | Detalhe |
|---------|---------|
| Arquivo | `src/localStorage.js` |
| Chave | `golds` |
| Formato | JSON stringificado (número inteiro) |
| Uso | Armazenar pontuação da última partida entre Game Over e envio ao ranking |
| Ciclo de vida | Persiste entre sessões do navegador até ser sobrescrito |

**Funções:**

| Função | Descrição |
|--------|-----------|
| `localStoreGold(gold)` | Salva valor em `localStorage` |
| `getLocalGolds()` | Lê valor; retorna `0` e inicializa se não existir |
| `storeGolds(gold)` | Alias para `localStoreGold` |

**Observação:** se `localStorage` contiver JSON inválido, `JSON.parse` lançará exceção — não há tratamento de erro.

### 2. API externa (ranking global)

| Aspecto | Detalhe |
|---------|---------|
| Provedor | Microverse JS Capstone Backend |
| Hospedagem | Google Cloud Functions |
| Base URL | `https://us-central1-js-capstone-backend.cloudfunctions.net/api/` |
| Arquivo cliente | `src/boardGold.js` |
| Protocolo | REST via `fetch` |

**Entidades lógicas (na API remota, não no projeto):**

| Entidade | Operações | Endpoint |
|----------|-----------|----------|
| Game | POST (criar) | `/games/` |
| Score | POST (criar), GET (listar) | `/games/{gameId}/scores/` |

**Game ID em uso:**
```
91a9adf7a98b4b8490c6689a10fedb2f
```

A estrutura interna do banco da API (tabelas, índices, etc.) **não é documentada neste repositório** — A confirmar na documentação da Microverse.

## ORM

Não utilizado.

## Models locais

O único "model" do projeto (`src/Model.js`) é um objeto em memória para preferências de áudio — **não é um model de banco de dados**.

```javascript
// Propriedades em memória (não persistidas):
musicOn, soundOn, bgMusicPlaying
```

## Migrations

Não existem.

## Seeds

Não existem.

## Relacionamentos

Não aplicável localmente. Na API externa, o relacionamento implícito é:

```
Game (1) ──── (N) Scores
```

Cada score contém `user` (string) e `score` (number).

## Dados sensíveis

| Dado | Sensibilidade | Onde |
|------|---------------|------|
| Nome do jogador | Baixa (público no ranking) | Enviado à API, exibido no Board |
| Pontuação | Baixa (pública) | localStorage + API |
| Credenciais | Nenhuma | Projeto não usa autenticação |

Não há dados pessoais além do nickname escolhido pelo jogador.

## Testes relacionados a persistência

| Arquivo | O que testa |
|---------|-------------|
| `test/mockLocalStorage.test.js` | Funções de localStorage |
| `test/mockAPI.test.js` | Chamadas HTTP mockadas (submit, get board, init game) |

Os testes de API usam `test/mockAPI.js` — cópia de `src/boardGold.js` com `node-fetch` em vez de `fetch` nativo.

## Variáveis de ambiente de banco

Nenhuma. O projeto não se conecta a banco de dados.

## Observações para manutenção futura

1. Se a API da Microverse for descontinuada, o ranking deixará de funcionar — considerar backend próprio.
2. O `initGame()` poderia criar um novo game ID dinamicamente, mas hoje o ID é fixo no código.
3. Opções de áudio (`Model.js`) não são salvas em `localStorage` — reiniciam ao recarregar a página.
