# Decisões técnicas

Registre aqui escolhas importantes para o agente não contradizer o que você já decidiu.

## Formato sugerido

```markdown
### [data] Título da decisão
- **Contexto:** por que surgiu
- **Decisão:** o que foi escolhido
- **Motivo:** por que essa opção
```

---

## Decisões

### 2026-06-15 — Manter Phaser 3 puro (JavaScript)
- **Contexto:** projeto legado da Microverse, código funcional
- **Decisão:** não migrar para TypeScript nem outro framework sem pedido explícito
- **Motivo:** escopo pequeno, risco alto de regressão

### 2026-06-15 — Documentação local fora do Git
- **Contexto:** contexto para o agente Cursor sem poluir o repositório
- **Decisão:** todos os `.md` de mapeamento ficam em `.cursor/local/` (gitignored)
- **Motivo:** informação pessoal/de trabalho, não precisa versionar

### 2026-06-15 — Mudanças no código por partes (um commit cada)
- **Contexto:** usuário quer controlar commits manualmente
- **Decisão:** qualquer alteração no código versionado deve ser feita em partes isoladas; parar após cada parte para o usuário commitar
- **Motivo:** histórico limpo, revisão mais fácil
- **Ordem sugerida para fixes (Fase 2):**
  1. `api/server.js` — catch-all
  2. `vercel.json` — deploy
  3. webpack — assets
  4. HTML/config — divId
  5. bugs em cenas (um arquivo por vez)
  6. testes (um suite por vez)

<!-- Adicione suas decisões abaixo -->
