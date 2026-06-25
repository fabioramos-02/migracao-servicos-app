# Classificação dos endpoints: consulta / regra / auth

> **Autor:** Fabio Ramos · **Atualizado:** 2026-06-25 · **Versão:** v1

> Classifica os 120 endpoints do `msdigital-gateway` pelo **esforço de reconstrução** na X-VIA.
> Gerado junto com o inventário por `_parse_spec.py` (campo `tipo`). A tabela completa, filtrável por
> tipo, está na aba _Inventário_ do site — aqui ficam só os quadros-resumo e as listas dos baldes
> não-triviais.

## Por que esse mapeamento faltava (e resolve a discussão "é fácil?")

"Migrar os serviços é fácil" e "tem regra de negócio escondida, é difícil" **estão os dois certos —
para subconjuntos diferentes** do contrato. Faltava o número que separa os dois. Cada endpoint cai em
um de três baldes:

| Tipo | O que é | Swagger basta? | Esforço |
|---|---|---|---|
| **consulta** | Leitura pura: lê de um sistema de origem e devolve. Sem gravar, sem efeito colateral, sem máquina de estado. | ✅ Quase — contrato + sistema de origem | **Baixo** |
| **regra** | Grava/processa: cria solicitação, dispara notificação, transição de estado, integração downstream. | ❌ Não — falta a lógica | **Alto** — exige a ficha [`template-regra-negocio.md`](template-regra-negocio.md) |
| **auth** | Autenticação/infra técnica: login Gov.br/AD, geração de token, descriptografia. | ⚠️ Parcial — depende de SmartPass/keycloak | **Especial** — trilha técnica à parte |

## Quadro-resumo (os 120 endpoints)

| Tipo | Qtd | % |
|---|---:|---:|
| consulta | 106 | 88% |
| regra | 7 | 6% |
| auth | 7 | 6% |
| **Total** | **120** | **100%** |

**Leitura para a reunião:** **88% do contrato é consulta** — aí a chefe tem razão, é reconstrução de
leitura, o Swagger quase basta (falta só ligar ao sistema de origem). Mas **7 endpoints carregam
regra de negócio** e **7 são auth** — esses 14 (~12%) concentram o risco e o esforço real. É onde o
"escondido" mora.

> Cuidado com a heurística ingênua "GET = fácil, POST = difícil": **não vale**. 3 POSTs de trânsito
> (`/debitos`, `/infracoes`, `/pontuacao`) e 2 de servidor (`/emprego-servidor`,
> `POST /validacao-carteira-funcional`) são **consulta** — usam body só por carregarem placa/renavam
> ou CPF, mas só **leem** do DETRAN/RH. Por isso a classificação é por path, não por método.

## Os 7 endpoints de `regra` (precisam de ficha antes do lote)

Cada um destes exige preencher [`template-regra-negocio.md`](template-regra-negocio.md) — é onde
está a lógica que o Swagger não carrega (validações, estado, side-effects, integrações):

| Método | Endpoint | Por que é regra |
|---|---|---|
| POST | `educacao/cdiems/solicitacao` | Cria solicitação de carteira do estudante — workflow + persistência |
| PUT | `educacao/cdiems/solicitacao/{codigo}` | Atualiza solicitação — transição de estado |
| POST | `procon/denuncia` | Registra denúncia (tipologia, geo, imagens) + notificação downstream |
| POST | `meio-ambiente/estrada-viva` | Registra notificação ambiental com imagens/localização |
| POST | `mulher-ms/sos` | **Botão de pânico** — alerta autoridades + geolocalização (crítico) |
| POST | `mulher-ms/teste-sos` | Variante de teste do SOS (mesmo fluxo, sem acionamento real) |
| POST | `servidor-publico/relatorio-de-diarias/assinatura` | Assinatura digital + transição de estado do despacho |

## Os 7 endpoints de `auth` (trilha técnica SmartPass/keycloak)

Não são "regra de negócio" do serviço; são autenticação/infra. Migram junto da camada de identidade,
não da camada funcional:

| Método | Endpoint | Papel |
|---|---|---|
| GET | `gov-br` | Início do fluxo OAuth2 Gov.br |
| POST | `gov-br` | Troca de code por token Gov.br |
| POST | `gsi/autenticacao` | Login contra Active Directory (back-office) |
| GET | `servidor-publico/autenticacao-cpf` | Autenticação por CPF do servidor |
| POST | `servidor-publico/relatorio-de-diarias/token` | Geração de token do fluxo de diárias |
| POST | `servidor-publico/relatorio-de-diarias/token-por-notificacao` | Token via notificação |
| POST | `log/descriptografar` | Descriptografia de log — utilitário técnico |

## Ponte com a priorização dos lotes

O tipo entra na ordem dos lotes junto com o volume de acesso (BI) — ver
[`priorizacao-por-uso.md`](../02-estudos/priorizacao-por-uso.md):

- **Lote 1 deve incluir ao menos 1 endpoint de `regra`** como arquétipo (ex.: `cdiems/solicitacao`
  ou `mulher-ms/sos`). Migrar só consultas primeiro dá uma falsa sensação de velocidade e adia o
  padrão mais difícil — a curva de aprendizado precisa bater no caso real cedo.
- **Os 7 `auth` são pré-requisito transversal**: sem a camada de identidade (Gov.br/keycloak)
  resolvida, nenhum serviço autenticado migra. Tratar como fundação, não como um lote comum.
- As **106 consultas** podem ir em lotes maiores e mais rápidos depois que os arquétipos validarem o
  padrão — é aqui que a migração "fica fácil", como esperado.

> Escopo: esta classificação cobre os endpoints **nativos** (que passam pelo gateway). Serviços que
> apenas redirecionam estão fora — ver
> [`escopo-app-nativo-vs-redirecionamento.md`](../02-estudos/escopo-app-nativo-vs-redirecionamento.md).
