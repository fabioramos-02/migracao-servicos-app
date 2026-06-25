# CLAUDE.md — migracao-servicos-app

Guia de onboarding (IA/dev) deste repositório.

## Objetivo

Levantamento da migração das APIs do **MS Digital** (`msdigital-gateway`) para reconstrução na
plataforma da **X-VIA**. Tese central: o **Swagger é só o contrato** (paths, parâmetros, schemas,
auth) — a **regra de negócio** não está nele e é mapeada à parte, e o **dado persistido** é trilha
separada. Material de apoio para a reunião de alinhamento com o Maycon (X-VIA).

> **Terminologia (importante):** o sistema antigo é o **MS Digital**, sob gestão do Estado.
> **Nunca** chamar de "EDS". Em diagramas ASCII, abreviar como `MS-D` quando faltar espaço.

## Estrutura (padrão GCS da SETDIG)

| Pasta | Conteúdo |
|---|---|
| `00-gestao/` | Pauta da reunião com o Maycon |
| `02-estudos/` | Estratégia de migração, padrão Strangler Fig, priorização por uso (BI) |
| `04-modelagem/` | Resumo do gateway (gerado) + ficha de regra de negócio |
| `data/` | `swagger.json` capturado do gateway (fonte da verdade do contrato) |
| `site/` | Página HTML (Design System MS): `index.html` (relatório) + `docs.html` (render dos MD) |
| `scripts/` | `sync-docs.sh` (copia MD p/ dentro de `site/`, exigido pelo Pages) |

Nomes: kebab-case, prefixo `NN-` nas pastas, sem abreviação pessoal.

## Build do site

```bash
python _parse_spec.py        # data/swagger.json -> gera 3 artefatos:
                             #   site/assets/inventario.json   (contrato estruturado)
                             #   site/assets/js/dados.js        (window.INVENTARIO, evita CORS file://)
                             #   04-modelagem/resumo-do-gateway.md (só resumo)
```

A **tabela completa dos 120 endpoints vive só no site** (aba Inventário, filtrável/paginada).
Não duplicar essa tabela em Markdown.

## GitHub Pages

O Pages publica **somente o conteúdo de `site/`**. Os MD ficam fora dessa pasta, então:

```bash
bash scripts/sync-docs.sh    # copia 00-gestao/02-estudos/04-modelagem/*.md -> site/docs-src/
```

`docs.html?doc=docs-src/...md` lê dessa cópia. O workflow `.github/workflows/pages.yml` roda o
script antes do upload. `site/docs-src/` é **gerado** → está no `.gitignore`. Rodar o script
sempre que um MD for editado, para o preview local refletir.

## Frontend — responsabilidade única (SRP)

`site/assets/js/`, um arquivo = uma responsabilidade:

| Arquivo | Responsabilidade |
|---|---|
| `dados.js` | dados gerados (`window.INVENTARIO`) |
| `filtros.js` | função pura: filtra endpoints (tag + método + busca) |
| `paginacao.js` | função pura: fatia lista em páginas (`size` configurável) |
| `tabela.js` | render da tabela de endpoints |
| `resumo.js` | render dos KPIs + barras de priorização |
| `abas.js` | navegação ARIA tabs |
| `docs-manifesto.js` | lista dos docs abríveis (fonte única do índice) |
| `docs.js` | render do MD + índice lateral do `docs.html` |
| `main.js` | orquestra: estado, eventos, wiring |

Adicionar doc ao índice lateral = **1 entrada** em `docs-manifesto.js`.

## Regra de Design System (DS-MS)

Pacote `@design-system-ms/ds-sis` (tokens + componentes), vendorizado em `site/assets/css|js`.
- **Só `var(--token)`, zero hex hardcoded.** WCAG AA obrigatório onde há UI.
- O DS **não tem componente de Tabela** → a tabela é bespoke, mas usando tokens (header
  `--color-primary-700` + texto branco, zebra com `--color-neutral-100`, bordas `--color-neutral-200`).

## Commits

Sem assinatura de IA (regra herdada do global). Commits são autoria humana.
