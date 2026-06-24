# Estudo — Estratégia de Migração das APIs do MS Digital para a X-VIA

> SETDIG · Material de apoio para a reunião com o Maycon (X-VIA)
> Versão de trabalho — revisar com os números do Swagger e do BI quando ingeridos.

## 1. O problema em uma frase

A X-VIA reconstruirá as APIs do MS Digital na ferramenta dela. O Swagger do `msdigital-gateway`
é a base do **contrato** (o quê cada endpoint expõe e quais dados recebe/retorna). Mas reconstruir
só pelo Swagger replica a **casca** e perde a **regra de negócio** — que não está documentada nele.

## 2. As três camadas da migração

| Camada | O que é | Swagger entrega? | Onde está o resto |
|---|---|---|---|
| **Contrato** | Paths, métodos, parâmetros, schemas de request/response, códigos de erro, auth | ✅ **Sim, 100%** | O próprio `openapi.json` |
| **Regra de negócio** | Validações, orquestração entre serviços, side-effects, integrações downstream, máquina de estados | ❌ **Não** | Código-fonte EDS, documentação dos módulos, sessões de transferência |
| **Dado persistido** | Schema real do banco, campos internos não expostos, histórico | ⚠️ **Parcial** (só DTO de borda) | Banco de dados — trilha de migração de dados à parte |

> **Risco nº 1:** tratar o Swagger como especificação completa. Ele é a superfície de contato.
> "Recriar tudo" exige contrato **+** regra de negócio **+** dado **+** não-funcionais.

## 3. Conexão com a documentação dos módulos EDS

A regra de negócio que o Swagger não carrega é **exatamente** o que a SETDIG já está documentando
nos módulos do ecossistema EDS (Control SSO, Admin, Atendimento, Integrador, FormFlow, CMS) —
ver Feature 115 / PBIs 116–121 do backlog TFS. **Levar essas duas frentes juntas para o Maycon:**

- **Swagger** = o quê o gateway expõe (contrato).
- **Doc dos módulos EDS** = como cada coisa funciona por dentro (regra de negócio).

Casadas, elas dão à X-VIA o material para reconstruir sem perder lógica.

## 4. Estratégia recomendada: Strangler Fig (não big-bang)

Com **~465 mil usuários ativos** e 36 serviços, migração de uma vez é risco alto demais. A
abordagem recomendada é **strangler fig**: substituir endpoint a endpoint, com o gateway
roteando para o serviço novo (X-VIA) ou o antigo (EDS) conforme cada um fica pronto e homologado.

Vantagens:
- Migração **incremental e reversível** — se um endpoint novo falha, roteia de volta.
- Casa diretamente com os **lotes de migração do Plano PGD-MS** (lote 1/2/3 dos 36 serviços).
- Permite **operação assistida** por serviço (15 dias, conforme o contrato).

## 5. Decisão crítica: preservar o contrato?

A pergunta que muda tudo na reconstrução:

- **Opção A — Preservar o contrato (recomendado):** a X-VIA recria os mesmos paths, payloads e
  códigos de erro. Migração **transparente** para os consumidores; ninguém quebra. Default dado
  o volume de usuários.
- **Opção B — Redesenhar:** API nova com contrato diferente. Exige versionamento (`/v2`),
  período de convivência e **migração de cada consumidor** — custo e risco bem maiores.

> Sem essa definição fechada, não dá para dimensionar o esforço da X-VIA.

## 6. O que o Swagger responde sobre "qual dado é necessário"

Para cada endpoint, o `openapi.json` entrega de forma estruturada:

- **Entrada:** parâmetros de path/query/header + schema do request body (campos, tipos,
  obrigatoriedade, enums, formatos).
- **Saída:** schema das respostas por código HTTP (200, 201, 4xx, 5xx).
- **Segurança:** esquema de auth exigido por endpoint (Bearer, OAuth2, API key).
- **Agrupamento:** tags (normalmente = módulo/serviço de negócio).

Isso vira o inventário em [`../04-modelagem/inventario-endpoints.md`](../04-modelagem/inventario-endpoints.md) —
a base objetiva da resposta "quais dados a X-VIA precisa criar".

## 7. Riscos e dependências

| Risco | Impacto | Mitigação |
|---|---|---|
| Reconstruir só pelo Swagger, sem regra de negócio | Alto | Mapear regra de negócio por serviço (template) antes de cada lote |
| Consumidores desconhecidos quebram ao desligar a API antiga | Alto | Inventário de consumidores por endpoint antes do go-live |
| Dado/banco tratado como se fosse o DTO do Swagger | Médio | Trilha separada de migração de dados; validar schema real |
| Acesso ao gateway só por rede gov/VPN trava o levantamento | Médio | Capturar `openapi.json` uma vez e versionar em `data/` |
| Não-funcionais (rate limit, SLA, timeouts) não migrados | Médio | Levantar requisitos não-funcionais por endpoint na reunião |

## 8. Próximos passos

1. Capturar o `openapi.json` do gateway → preencher o inventário de endpoints.
2. Cruzar com o BI de uso → priorizar a ordem de migração (mais acessados primeiro).
3. Fechar com o Maycon: preservar contrato? estratégia? dono da regra de negócio por serviço?
4. Para cada serviço do lote 1, preencher a ficha de regra de negócio antes do desenvolvimento.
