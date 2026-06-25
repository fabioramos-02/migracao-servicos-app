# Padrão Strangler Fig — o que é e por que usar nesta migração

> SETDIG · Explicação simples do padrão escolhido para migrar as APIs do MS Digital para a X-VIA.

## 1. A ideia em uma frase

Trocar o sistema antigo por um novo **pouco a pouco**, endpoint por endpoint, em vez de desligar
tudo de uma vez e ligar tudo de novo (o chamado "big bang"). Enquanto a troca acontece, antigo e
novo convivem — o usuário não percebe a diferença.

## 2. De onde vem o nome

"Strangler fig" é a figueira-estranguladora, planta que cresce em volta de uma árvore, ano após
ano, até substituí-la completamente — sem nunca derrubar a árvore de uma vez. A árvore antiga vai
sendo "envolvida" pela nova até sobrar só a estrutura nova. É essa imagem que dá nome ao padrão.

## 3. Como funciona, na prática

Existe uma peça no meio do caminho — o **gateway** — que recebe todas as chamadas dos usuários e
decide para onde mandar cada uma: para o serviço **antigo** (ainda no MS Digital) ou para o serviço
**novo** (já reconstruído na X-VIA). Essa decisão é por **endpoint**, não pelo sistema inteiro.

```
                         ┌────────────────────────┐
        usuário/app ───▶│   Gateway (roteador)    │
                         └────────────────────────┘
                              │              │
                  endpoint    │              │   endpoint
                  ainda não   │              │   já migrado
                  migrado     ▼              ▼
                  ┌───────────────┐   ┌───────────────┐
                  │  MS Digital   │   │     X-VIA     │
                  │   (antigo)    │   │     (novo)    │
                  └───────────────┘   └───────────────┘
```

No início, **tudo** passa pelo caminho da esquerda (MS Digital). Conforme cada endpoint é reconstruído,
testado e aprovado, o gateway passa a mandar **aquele endpoint específico** pelo caminho da
direita (X-VIA). O processo se repete endpoint a endpoint até não sobrar nada no lado antigo.

```
Lote 1               Lote 2                   Lote 3                ...   Migração completa
[MS-D][MS-D][MS-D]  [X-VIA][MS-D][MS-D]  [X-VIA][X-VIA][MS-D]  ...  [X-VIA][X-VIA][X-VIA]
   ▲ tudo no antigo       ▲ indo migrando            ▲ quase tudo no novo
```

## 4. Por que esse padrão e não trocar tudo de uma vez

| | Big bang (trocar tudo de uma vez) | Strangler fig (pouco a pouco) |
|---|---|---|
| **Risco** | Alto — se algo falhar, falha tudo, ao mesmo tempo, pra todo mundo | Baixo — se um endpoint falhar, só ele é afetado |
| **Reversão** | Difícil — voltar atrás significa desfazer a virada inteira | Fácil — basta o gateway voltar a rotear aquele endpoint pro antigo |
| **Validação** | Só dá pra testar de verdade depois que tudo já foi trocado | Cada endpoint é validado isoladamente, com tempo, antes do próximo |
| **Usuário percebe?** | Risco alto de indisponibilidade geral | Contrato preservado → usuário não percebe a troca |

Com **~465 mil usuários ativos** dependendo dessas APIs, o risco de uma falha geral é alto demais
para justificar o big bang. O strangler fig limita o "raio de explosão" de qualquer problema a
**um endpoint por vez**.

## 5. Pré-condição importante: preservar o contrato

O strangler fig só fica "invisível" para o usuário se o endpoint novo (X-VIA) responder
**exatamente igual** ao antigo — mesmo caminho (path), mesmos parâmetros, mesmo formato de
resposta. Esse é o **contrato**, e é exatamente o que o Swagger do gateway documenta hoje (ver
[`analise-migracao-apis.md`](analise-migracao-apis.md), seção 2). Por isso o levantamento do
contrato é o primeiro passo antes de qualquer endpoint ser migrado.

## 6. Como isso se encaixa no Plano PGD-MS

Os **lotes de migração** do Plano PGD-MS (lote 1, 2, 3 dos 36 serviços) já são, na prática, a
aplicação desse padrão: cada lote é um grupo de endpoints que muda de lado no gateway, com
**operação assistida de 15 dias** depois da virada — uma rede de segurança para voltar atrás se
algo não funcionar como esperado.

## 7. Resumo em uma imagem

```
ANTES                    DURANTE (anos de migração)              DEPOIS
┌──────────┐             ┌──────────┐  ┌──────────┐              ┌──────────┐
│ MS Digit.│  ───────▶   │ MS Digit.│  │  X-VIA   │  ───────▶    │  X-VIA   │
│ (tudo)   │             │ (o resto)│  │ (migrado)│              │  (tudo)  │
└──────────┘             └──────────┘  └──────────┘              └──────────┘
                          ambos atendem, gateway decide quem responde cada endpoint
```
