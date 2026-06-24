# Inventário de Endpoints — Gateway MS Digital

> Fonte do contrato: `data/openapi.json` (capturado do gateway `msdigital-gateway`).
> **Pendente:** preencher a partir do spec. Colunas marcadas _(Swagger)_ saem do spec
> automaticamente; colunas _(humano)_ exigem mapeamento com a equipe.

## Legenda das colunas

| Coluna | Origem | Descrição |
|---|---|---|
| Método | Swagger | GET/POST/PUT/PATCH/DELETE |
| Path | Swagger | Caminho do endpoint |
| Tag / Serviço | Swagger | Agrupamento (normalmente = módulo de negócio) |
| Campos request | Swagger | Parâmetros + campos do body (nome, tipo, obrigatório) |
| Campos response | Swagger | Schema da resposta de sucesso |
| Auth | Swagger | Esquema de segurança exigido |
| Tem regra de negócio? | humano | Sim/Não + onde está documentada (módulo EDS / código) |
| Consumidores | humano | Quem chama este endpoint hoje (apps, sistemas, órgãos) |
| Lote migração | humano | Lote 1/2/3 conforme priorização por uso |
| Dado sensível? | humano | LGPD — CPF, saúde, financeiro etc. |

## Inventário

| Método | Path | Tag / Serviço | Campos request | Campos response | Auth | Regra de negócio? | Consumidores | Lote | Dado sensível? |
|---|---|---|---|---|---|---|---|---|---|
| _(preencher do openapi.json)_ | | | | | | | | | |

## Resumo (preencher após ingestão)

- Total de endpoints: —
- Por tag/serviço: —
- Por método: —
- Endpoints com dado sensível (LGPD): —
- Endpoints sem owner de regra de negócio identificado: —
