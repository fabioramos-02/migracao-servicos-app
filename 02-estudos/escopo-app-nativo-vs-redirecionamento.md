# Escopo do APP: serviços nativos vs. redirecionamento

> **Autor:** Fabio Ramos · **Atualizado:** 2026-06-25 · **Versão:** v1

> Material de apoio para dimensionar **o que realmente entra na migração das APIs**. Cruza o menu de
> serviços do APP MS com o inventário do `msdigital-gateway` (ver aba _Inventário_ do site).

## Por que esse mapeamento faltava

A migração foi conversada como "migrar os serviços do app". Mas **nem todo serviço do app é uma
API a reconstruir**. O menu mistura dois tipos:

- **Nativo** — a tela é renderizada dentro do app e os dados vêm do **gateway MS Digital**
  (`msdigital-gateway`). **É a superfície real da migração**: cada um desses depende de um ou mais
  endpoints que a X-VIA precisa reconstruir.
- **Redireciona** — o item só **abre uma URL externa** (portal da IAGRO, DETRAN, Procon, etc.) em
  webview/navegador. **Não passa pelo gateway.** Para a X-VIA, migrar isso é, no limite, **manter o
  link** — não há contrato nem regra de negócio a recriar do lado do app.

Sem separar esses dois eixos, o esforço fica superestimado (conta-se redirect como se fosse API) ou
subestimado (ignora-se que cada nativo tem contrato + regra). Este documento separa.

> Convenção do menu original: serviços marcados com `**` são **nativos**; os demais **redirecionam**
> (a URL externa está ao lado de cada um na fonte).

## Conclusão de escopo (resumo)

- O menu tem **dezenas de itens**, mas só **~36 serviços nativos** (≈39 ações de menu marcadas `**`)
  consomem o gateway. **Esses são o trabalho de API.**
- Todo o resto **redireciona** → fora do esforço de reconstrução de API (só link/webview).
- Os ~36 nativos batem com as **21 tags** do gateway (um serviço-app pode usar vários endpoints da
  mesma tag; algumas tags são infra compartilhada — ver adiante).

## Mapa: serviço-app nativo → tag do gateway

| Serviço-app nativo (`**`) | Tag(s) no gateway | Obs. |
|---|---|---|
| Trânsito · Pontuação / Multas / Débito de Veículos | `transito` | POSTs de **consulta** (placa+renavam / cpf+registro) |
| Transparência · Servidores | `transparencia-servidor` | consulta |
| Transparência · Diárias | `transparencia-diaria` | consulta |
| Transparência · Passagens | `transparencia-passagens` | consulta |
| Transparência · Receitas (Simplificada/Consolidada/Pesquisa) | `transparencia-receitas` | consulta |
| Transparência · Despesa / Detran-Destinação de Multas | `transparencia-despesa` | consulta (`/despesas/detran`) |
| Segurança · Delegacias e Endereços | `seguranca` | consulta |
| Mulher MS · Delegacia da Mulher | `seguranca` | usa `/municipios/{cod}/delegacias?salaLilas` |
| Mulher MS · Combate à Violência | `mulher` | **regra** — `POST /sos` (botão de pânico) |
| Meio Ambiente · Estrada Viva (Registrar) | `meio-ambiente` | **regra** — `POST /estrada-viva` |
| Meio Ambiente · Estrada Viva (Pendentes) | `meio-ambiente` | ⚠️ sem endpoint claro de listagem — **gap** |
| Meio Ambiente · Licenciamento Ambiental | `meio-ambiente` | consulta (`/processo-licenciamento`) |
| Meio Ambiente · Previsão Semanal | `meio-ambiente` | consulta (`/previsoes`) |
| Meio Ambiente · Autorização de Pesca (Carteira) | `meio-ambiente` | consulta (`/autorizacao-de-pesca` + pdf) |
| Saúde · Cartão de Vacinação | `saude` | consulta (`/carteira-de-vacinacao`) |
| Saúde · Cartão SUS Online | `saude` | consulta (`/cartao/{cpf}`) |
| Saúde · Cartão do Doador de Sangue | `saude` | consulta |
| Saúde · Resultado de Exames Hemosul | `saude` | consulta |
| Saúde · Estabelecimentos de Saúde | `saude` | consulta |
| Saúde · Medicamentos | `saude` | consulta |
| Educação · Consultar CDIEMS | `educacao` | consulta (`/cdiems/solicitacao/{codigo}`, `/validacao`) |
| Educação · Solicitar CDIEMS | `educacao` | **regra** — `POST/PUT /cdiems/solicitacao` |
| Cultura e Esporte · Carteira de Identificação Desportiva | `cultura-e-esporte` | consulta (`/carteira-do-atleta`) |
| Assistência Social · Passe Livre Intermunicipal | `assistencia-social` | consulta (`/passe-livre`) |
| Assistência Social · Endereço dos CRAS | `assistencia-social` | consulta (`/cras`) |
| Servidor Público · Contracheque | `servidor publico` | consulta (`/contracheques`) |
| Servidor Público · Informe de Rendimentos | `servidor publico` | consulta (`/rendimentos`) |
| Servidor Público · Carteira Funcional | `servidor publico` | consulta (`/carteira-funcional`) |
| Servidor Público · BIM | `servidor publico` | consulta (`/bim`) |
| Servidor Público · Clube de Benefícios | `servidor publico` | consulta (`/clube-beneficios`) |
| Servidor Público · Relatório de Diárias | `servidor publico` | **regra + auth** — `/relatorio-de-diarias/*` (token, assinatura) |

> Serviços nativos **sem API no gateway** (são nativos, mas não há contrato a migrar — provável
> streaming/conteúdo): **TV Educativa**, **Rádio Educativa**, **LeiaMS**. Tratar à parte.

## Tags do gateway que são infra/suporte (sem item próprio no menu)

Consumidas por vários serviços, não aparecem como "serviço" para o cidadão:

| Tag | Papel |
|---|---|
| `ibge` | Dropdowns de estado/município/CEP usados nos formulários |
| `gov-br` | Login Gov.br (OAuth2) — auth |
| `gsi` | Autenticação contra Active Directory (back-office) — auth |
| `log` | Descriptografia de log — infra técnica |
| `noticias` | Feed de notícias da home do app |
| `nota-premiada` | Consulta de CPF na Nota MS Premiada (ver gap abaixo) |

## Gaps e mismatches (validar com o time do app / Maycon)

São casos onde o menu e o gateway **não batem** — precisam de confirmação antes de fechar o escopo:

1. **Nota MS Premiada** — no menu **redireciona** (`notamspremiada.ms.gov.br`), mas o gateway **tem**
   `GET /nota-premiada/{cpf}`. Ou o endpoint está ocioso, ou parte do fluxo é nativo. Confirmar.
2. **Procon · Denúncia** — no menu **redireciona** (`portalservicos.procon.ms.gov.br`), mas o gateway
   **tem** `POST /procon/denuncia` + `tipo-denuncia` + `tipo-local`. Mesmo caso: API existe, menu
   redireciona. Confirmar se há fluxo nativo de denúncia.
3. **Saúde · Exames LACEN** — no menu **redireciona** (`lacendigital.saude.ms.gov.br`), mas o gateway
   **tem** `GET /resultado-exames-lacen` e `/baixar-laudo-lacen`. Confirmar.
4. **Estrada Viva · Notificações Pendentes** — nativo no menu, mas o gateway só expõe `POST
   /estrada-viva` (registro). Falta endpoint de **listagem de pendentes**? Confirmar.

> Esses mismatches importam: se a API já existe no gateway, o serviço é **migração de API** (não só
> link), o que **aumenta** a superfície real além dos `**` do menu.

## O que redireciona (fora do escopo de API)

Resumo por categoria — todos abrem **URL externa**, não tocam o gateway (detalhe das URLs na fonte
do menu):

- **Agronegócio** — categoria inteira redireciona (IAGRO, SEMAGRO/MANUCÃ): Agrotóxico, Animal
  Identificado, Plantio, Cadastro de Produtor, GTA, e-CIS-E, Estabelecimentos, Eventos, Ferrugem de
  Soja, Ficha Sanitária, Laboratório, Laudo Exame, MANUCÃ, Mapa de Ferrugem, Núcleo, Produto/Vacinas,
  Profissional, PTV.
- **Trânsito (demais)** — Baixar CRLV, Exames, IPVA, Licenciamento e Multas, B.O. Sem Vítimas,
  Agendamento, Educação, Outros (DETRAN/MeuDetran).
- **Procon** — Reclamação, Denúncia, Consulta de Processos, Boletins, Fale Conosco, Procons
  Municipais (portal Procon). _(ver gap 2)_
- **Transparência (demais)** — Carta de Serviço, LGPD.
- **Segurança (demais)** — Antecedentes, Agendamento RG, B.O. Online, Bombeiros (Prevenir, Legislação,
  Regularização, Profissionais, PSCIP, Certidão, Outros), Delegacia Virtual, Certificado de Vistoria.
- **Meio Ambiente (demais)** — Autorização de Pesca (Solicitação) (IMASUL).
- **Mulher MS (demais)** — Não se Cale, Denúncias Online, Protetivas Online.
- **Saúde (demais)** — Exames LACEN _(ver gap 3)_, Painel Brucelose, Estoque Hemosul, Estoque de
  Medicamentos, Certificados SES.
- **AGEMS** — WhatsApp, e-Ouvidoria, Horários e Tarifas.
- **Diário Oficial**, **Turismo** (VisitMS, Observatório, Turismo), **Habitação** (Boleto AGEHAB),
  **Trabalho** (MS Qualifica), **Assistência (demais)** (MS Supera, CIPTEA), **Educação (demais)**
  (Painel do Aluno, Caminho Certo), **Servidor (demais)** (Lista de Eventos EscolaGov).

## Próximo passo

Cruzar este escopo com a **classificação consulta/regra/auth**
([`classificacao-consulta-vs-regra.md`](../04-modelagem/classificacao-consulta-vs-regra.md)) e com os
**acessos do BI** ([`priorizacao-por-uso.md`](priorizacao-por-uso.md)) para montar a ordem dos lotes.
