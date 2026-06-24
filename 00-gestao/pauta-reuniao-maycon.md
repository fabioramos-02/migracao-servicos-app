# Pauta — Reunião de Alinhamento: Migração das APIs do MS Digital

> **Participantes:** Fabio (SETDIG), Maycon (X-VIA) — + Duda / Dani (SETDIG) se aplicável
> **Data:** `<a definir>`
> **Objetivo:** alinhar como a X-VIA vai reconstruir as APIs do MS Digital — escopo, estratégia
> e responsabilidades — usando o Swagger do gateway como base do contrato.

## 1. Enquadramento (5 min)

- A X-VIA reconstrói as APIs do `msdigital-gateway` na ferramenta dela.
- Swagger = contrato (o quê expõe). **Não** carrega regra de negócio nem o dado persistido.
- Material de apoio: inventário de endpoints (Swagger) + priorização por uso (BI) + doc dos
  módulos EDS (regra de negócio).

## 2. Decisões a fechar

### 2.1 Preservar ou redesenhar o contrato? **(decisão-chave)**
- Preservar (mesmos paths/payloads) = migração transparente, ninguém quebra. **Recomendado**
  (~465 mil usuários).
- Redesenhar = versionar `/v2` + migrar consumidores. Custo/risco maiores.

### 2.2 Estratégia de migração
- Proposta: **strangler fig** (endpoint a endpoint, gateway roteia old/new), alinhada aos lotes
  do Plano PGD-MS. Confirmar.

### 2.3 Dono da regra de negócio por serviço
- O Swagger não traz a lógica. Quem responde por ela: EDS (doc/código) ou transferência?
- Conectar com a documentação dos módulos EDS (Control, Admin, Atendimento, Integrador,
  FormFlow, CMS) já em andamento na SETDIG.

### 2.4 Inventário de consumidores
- Quem chama cada endpoint hoje? Sem isso não se desliga a API antiga com segurança.

### 2.5 Requisitos não-funcionais
- Auth (SmartPass / Gov.br), rate limit, SLA, timeouts, idempotência, contrato de erro.

### 2.6 Migração de dados
- Confirmar que é trilha **separada** do contrato de API (banco ≠ DTO do Swagger).

## 3. Priorização (com base no BI de uso)

- Serviços mais acessados primeiro. 1º e 2º como **arquétipos** (cobrem os padrões mais difíceis),
  não os mais fáceis. Validar a lista do lote 1 com o Maycon.

## 4. Próximos passos e responsáveis

| Ação | Responsável | Prazo |
|---|---|---|
| Fechar decisão "preservar contrato" | — | — |
| Inventário de consumidores por endpoint | — | — |
| Ficha de regra de negócio dos serviços do lote 1 | — | — |
| Definir ambiente/credenciais de acesso ao gateway p/ a X-VIA | — | — |

## 5. Anexos

- Inventário de endpoints — `04-modelagem/inventario-endpoints.md`
- Estudo da estratégia — `02-estudos/analise-migracao-apis.md`
- Priorização por uso — `02-estudos/priorizacao-por-uso.md`
- Página de apresentação — `site/index.html`
