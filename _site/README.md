# Estrutura Jekyll — Kennidy L. Guimarães

## Como usar

### Instalação
```bash
bundle install
bundle exec jekyll serve
```

### Estrutura de arquivos

```
jekyll-site/
├── _config.yml              # Configurações globais e dados do autor
├── Gemfile                  # Dependências Ruby/Jekyll
├── index.md                 # Página inicial (usa layout: home)
│
├── _layouts/
│   ├── default.html         # Wrapper base (head, body, footer)
│   ├── home.html            # Layout da página inicial com sidebar
│   └── article.html         # Layout de artigo com header, meta, referências
│
├── _includes/
│   ├── nav.html             # Menu de navegação
│   ├── social.html          # Links sociais (Instagram, GitHub, X)
│   ├── footer.html          # Rodapé com grid de contato
│   └── scripts.html         # JS de RSS Medium + GitHub API
│
├── _posts/
│   └── 2025-02-14-random-hash-cascade.md   # Artigo de exemplo
│
└── assets/
    └── css/
        └── style.css        # Todo o CSS (variáveis, reset, componentes)
```

## Criar um novo artigo

Crie um arquivo em `_posts/` no formato `YYYY-MM-DD-slug.md`:

```markdown
---
layout: article
title: "Título do Artigo"
subtitle: "Subtítulo opcional"
date: 2025-03-01
author: "Kennidy L. Guimarães"
categories: [criptografia]
references:
  - "AUTOR. *Obra*. Editora, ano."
related:
  - title: "Artigo relacionado"
    category: "Categoria"
    date: "Mês de Ano"
    url: "/artigos/slug/"
---

Conteúdo em Markdown...
```

## Notas

- Dados do autor ficam centralizados em `_config.yml`
- O CSS do artigo está unificado em `style.css`
- Os scripts de Medium/GitHub usam `site.author.medium` e `site.author.github` do `_config.yml`
