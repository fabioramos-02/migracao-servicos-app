# Migração das APIs do MS Digital → X-VIA

> Secretaria-Executiva de Transformação Digital — SETDIG
> Levantamento e estudo da migração das APIs do gateway **MS Digital** (`msdigital-gateway`)
> para reconstrução na plataforma da X-VIA.

## Objetivo

A X-VIA vai reconstruir as APIs do MS Digital na ferramenta dela. Este repositório reúne o
**levantamento do contrato** (a partir do Swagger/OpenAPI do gateway), a **priorização por uso**
(BI de acessos do APP) e o **estudo da estratégia de migração** — material de apoio para a
reunião de alinhamento com o Maycon (X-VIA).

A tese central: **Swagger é a casca (contrato), não a lógica.** Reconstruir só pelo Swagger
replica a superfície e perde a regra de negócio. Por isso o levantamento separa três camadas:
contrato (✅ Swagger), regra de negócio (❌ — mapear) e dado persistido (⚠️ — migração à parte).

## Como navegar (estrutura GCS)

| Pasta | Conteúdo |
|---|---|
| [`00-gestao/`](00-gestao/) | Pauta da reunião com o Maycon |
| [`02-estudos/`](02-estudos/) | Análise da estratégia de migração + priorização por uso (BI) |
| [`04-modelagem/`](04-modelagem/) | Inventário de endpoints + template de mapeamento de regra de negócio |
| [`site/`](site/) | Página HTML (Design System MS) que apresenta o estudo e renderiza os arquivos Markdown (`docs.html`) |
| [`data/`](data/) | `openapi.json` capturado do gateway (fonte da verdade do contrato) |

Padrão de pastas conforme o modelo GCS da SETDIG
(`documentacao-xvia/proposta-organizacao/docs/01-modelo-gcs.md`).

## Fontes

- **Swagger do gateway:** `https://api.sgi.ms.gov.br/d0526/msdigital-gateway/v1/swagger`
  (spec gated — exige sessão autenticada / rede gov).
- **BI de uso do APP:** `https://bench-perfil.streamlit.app/` (acessos por categoria e serviço).

## Como abrir o site

O site agora é publicado via **GitHub Pages** através do fluxo do GitHub Actions configurado na pasta `.github/workflows`.

Para visualizar o site localmente, basta abrir o `site/index.html` no navegador. A documentação dos arquivos `.md` pode ser lida na nova página `site/docs.html`, que buscará os textos e fará a conversão para HTML em tempo real, combinando com a nova identidade visual.

## Status

- [x] Estrutura GCS + estudo da estratégia + pauta
- [x] Captura do spec (`data/swagger.json` — OpenAPI 2.0, 120 endpoints, 21 serviços, auth keycloak)
- [x] Inventário de endpoints preenchido a partir do spec
- [x] Página HTML com Design System MS (`site/index.html`) e visualização interativa em MD (`site/docs.html`)
- [x] Deploy via GitHub Actions e Release automatizada (`v1`)
- [x] Identidade visual premium na aba de priorização e ajustes na logo MS.
- [ ] Dados de uso do BI integrados à priorização (pendente — BI gated)
