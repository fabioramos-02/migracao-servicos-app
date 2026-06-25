# Resumo do Gateway MS Digital

> Fonte: `data/swagger.json` — **Gateway MS Digital** v1.9.17 (OpenAPI 2.0). Base path: `/`

> Gerado automaticamente a partir do Swagger. **A tabela completa dos endpoints (filtrável e paginada) está na aba _Inventário_ do site** — não é duplicada aqui.

## Números do contrato

- **Operações (endpoints):** 120
- **Paths:** 117
- **Schemas (definitions):** 310
- **Por método:** GET 103, POST 16, PUT 1
- **Esquemas de auth:** keycloak (apiKey)

## Endpoints por serviço

Volume por serviço — base para ordenar os lotes de migração (cruzar com os acessos do BI).

| Serviço | Endpoints |
|---|---|
| saude | 23 |
| servidor publico | 19 |
| transparencia-receitas | 8 |
| educacao | 7 |
| transparencia-despesa | 7 |
| transparencia-diaria | 7 |
| transparencia-passagens | 7 |
| transparencia-servidor | 6 |
| assistencia-social | 5 |
| ibge | 5 |
| meio-ambiente | 5 |
| transito | 4 |
| procon | 3 |
| seguranca | 3 |
| cultura-e-esporte | 2 |
| gov-br | 2 |
| gsi | 2 |
| mulher | 2 |
| log | 1 |
| nota-premiada | 1 |
| noticias | 1 |

## Mapeamento da regra de negócio

O Swagger entrega só o contrato. A regra de negócio de cada serviço é mapeada à parte, na ficha [`template-regra-negocio.md`](template-regra-negocio.md).

