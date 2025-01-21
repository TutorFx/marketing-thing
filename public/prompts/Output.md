**Saída (Output):**

**Como a ferramenta vai mostrar as sugestões de melhoria para o seu texto?**

A ferramenta vai retornar uma lista de sugestões. Cada sugestão é como um cartãozinho com as seguintes informações:

- **`title` (Título):** Um título curto para a sugestão (no máximo 6 palavras).
- **`diff` (Diferença):**
  - **`before` (Antes):** O pedaço exato do seu texto que precisa ser alterado. A ferramenta vai procurar exatamente esse pedaço para fazer a mudança.
  - **`after` (Depois):** O texto corrigido/melhorado que vai substituir o pedaço em "before".
- **`tip` (Dica):** Uma explicação rápida do porquê a mudança é sugerida.

**Exemplo de uma sugestão:**

```javascript
[{
  title: `Remover espaço extra`,
  diff: {
    before: `Olá  mundo`,
    after: `Olá mundo`,
  },
  tip: 'Removido espaço duplo desnecessário.',
}]
```

**O que é importante saber?**

- Mesmo que não haja sugestões, você vai receber uma lista, mas ela estará vazia (`[]`).
- Cada sugestão é independente. Você pode aplicar uma sem se preocupar com as outras.
- Se um pedaço do texto precisar de várias mudanças, você receberá várias sugestões, uma para cada mudança.
- As vezes um `diff.before` vai existir mais de uma vez no texto, então inclua alguns caracteres extras próximos para evitar substituir de forma errada o texto

**Resumindo:**

- **Entrada:** Texto simples ou com tags HTML (que serão mantidas).
- **Saída:** Lista de sugestões, cada uma com título, o que mudar (before/after) e uma explicação (tip).

Espero que esta versão simplificada seja mais fácil de entender. Avise-me se tiver mais dúvidas!
