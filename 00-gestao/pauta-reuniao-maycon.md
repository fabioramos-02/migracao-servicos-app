# Pauta — Reunião de Alinhamento: Migração das APIs do MS Digital

> **Autor:** Fabio Ramos · **Atualizado:** 2026-06-25 · **Versão:** v1

> **Participantes:** Fabio (SETDIG), Maycon (X-VIA) — + Duda / Dani (SETDIG) se aplicável
> **Data:** `<a definir>`
> **Objetivo:** alinhar como a X-VIA vai reconstruir as APIs do MS Digital — escopo, estratégia
> e responsabilidades — usando o Swagger do gateway como base do contrato.

## 1. Enquadramento (5 min)

- A X-VIA reconstrói as APIs do `msdigital-gateway` na ferramenta dela.
- Swagger = contrato (o quê expõe). **Não** carrega regra de negócio nem o dado persistido.
- Material de apoio: inventário de endpoints (Swagger) + priorização por uso (BI) + doc dos
  módulos do MS Digital (regra de negócio).

## 2. O que a X-VIA (Maycon) pediu — insumos para o levantamento

O Maycon precisa desses insumos para a equipe interna da X-VIA montar o **as-is**, validar e depois
entregar o **to-be**. Status do que a SETDIG já tem:

| # | Insumo pedido | Status | Onde está / o que falta |
|---|---|---|---|
| 1 | **Tem API? Qual é? Documentação da API** | ✅ **Temos** | Swagger do `msdigital-gateway`: 120 endpoints, 21 serviços, auth keycloak. Inventário pronto (aba _Inventário_ do site + `resumo-do-gateway.md`). |
| 2 | **Documentação das regras de negócio** | ⚠️ **Parcial** | Não está no Swagger. Vem da doc dos módulos do MS Digital + código + transferência. Ficha por serviço a preencher (`template-regra-negocio.md`). |
| 3 | **Arquitetura do app:** consome mais de um serviço? conecta em mais de um banco? | ❌ **Levantar** | Mapear a arquitetura atual: serviços consumidos, bancos, integrações downstream por endpoint. |
| 4 | **Quem alimenta o app** (inclui/altera/exclui dados) | ❌ **Levantar** | Identificar quem opera cada serviço hoje (back-office, integrações, jobs) — entra no inventário de consumidores. |

> Observação: itens 1 já está respondido (Swagger/inventário). Itens 2–4 são o foco do levantamento.

## 3. Decisões a fechar

### 3.1 Responsável pelo desenvolvimento das novas APIs **(pergunta do Maycon)**
- A Duda falou em **reconstruir as APIs**, e o Swagger atual deve **deixar de existir**.
- **Quem desenvolve as novas APIs?** Equipe de desenvolvimento da SETDIG? A própria X-VIA? Outra equipe?
- Definir antes de dimensionar esforço e cronograma.

### 3.2 Preservar ou redesenhar o contrato? **(decisão-chave)**
- Preservar (mesmos paths/payloads) = migração transparente, ninguém quebra. **Recomendado**
  (~465 mil usuários).
- Redesenhar = versionar `/v2` + migrar consumidores. Custo/risco maiores.

### 3.3 Estratégia de migração
- Proposta: **strangler fig** (endpoint a endpoint, gateway roteia old/new), alinhada aos lotes
  do Plano PGD-MS. Confirmar.

### 3.4 Dono da regra de negócio por serviço
- O Swagger não traz a lógica. Quem responde por ela: MS Digital (doc/código) ou transferência?
- Conectar com a documentação dos módulos do MS Digital (Control, Admin, Atendimento, Integrador,
  FormFlow, CMS) já em andamento na SETDIG.

### 3.5 Inventário de consumidores
- Quem chama cada endpoint hoje? Sem isso não se desliga a API antiga com segurança.

### 3.6 Requisitos não-funcionais
- Auth (SmartPass / Gov.br), rate limit, SLA, timeouts, idempotência, contrato de erro.

### 3.7 Migração de dados
- Confirmar que é trilha **separada** do contrato de API (banco ≠ DTO do Swagger).

## 4. Perguntas da SETDIG (Fabio) — processo de trabalho

- **Reunião de acompanhamento:** como vai ser? Cadência (semanal/quinzenal), formato, quem participa?
- **Envio das entregas:** como a X-VIA vai entregar? Relatório? Qual formato/periodicidade e canal?

## 5. Priorização (com base no BI de uso)

- Serviços mais acessados primeiro. 1º e 2º como **arquétipos** (cobrem os padrões mais difíceis),
  não os mais fáceis. Validar a lista do lote 1 com o Maycon.

## 6. Próximos passos e responsáveis

| Ação | Responsável | Prazo |
|---|---|---|
| Definir quem desenvolve as novas APIs | — | — |
| Fechar decisão "preservar contrato" | — | — |
| Levantar arquitetura atual do app (serviços, bancos, integrações) | — | — |
| Levantar quem alimenta/opera cada serviço | — | — |
| Inventário de consumidores por endpoint | — | — |
| Ficha de regra de negócio dos serviços do lote 1 | — | — |
| Definir ambiente/credenciais de acesso ao gateway p/ a X-VIA | — | — |
| Definir cadência de acompanhamento e formato das entregas | — | — |

## 7. Anexos

- Resumo do gateway — `04-modelagem/resumo-do-gateway.md` (tabela completa na aba _Inventário_ do site)
- Padrão Strangler Fig (explicação + diagrama) — `02-estudos/padrao-strangler-fig.md`
- Estudo da estratégia — `02-estudos/analise-migracao-apis.md`
- Priorização por uso — `02-estudos/priorizacao-por-uso.md`
- Ficha de regra de negócio — `04-modelagem/template-regra-negocio.md`
- Página de apresentação — `site/index.html`
