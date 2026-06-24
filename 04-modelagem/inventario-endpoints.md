# Inventário de Endpoints — Gateway MS Digital

> Fonte: `data/swagger.json` — **Gateway MS Digital** v1.9.17 (OpenAPI 2.0). Base path: `/`

> Gerado automaticamente. Colunas humanas (regra de negócio, consumidores, lote, dado sensível) preenchidas na transferência.

## Resumo

- **Operações (endpoints):** 120
- **Paths:** 117
- **Schemas (definitions):** 310
- **Por método:** GET 103, POST 16, PUT 1
- **Esquemas de auth:** keycloak (apiKey)

### Endpoints por tag/serviço

| Tag / Serviço | Endpoints |
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

## Endpoints

| Método | Path | Tag | Request (params / body) | Response | Auth | Regra neg.? | Consumidores | Lote | Sensível? |
|---|---|---|---|---|---|---|---|---|---|
| GET | `/d0526/msdigital-gateway/v1/assistencia-social/cras/municipio/{id}` | assistencia-social | id:path | Model161 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/assistencia-social/cras/municipios` | assistencia-social | — | Model73 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/assistencia-social/cras/{id}` | assistencia-social | id:path | Model75 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/assistencia-social/passe-livre` | assistencia-social | cpf:query, dataNascimento:query | Model3 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/assistencia-social/passe-livre/{token}` | assistencia-social | token:path | Model3 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/cultura-e-esporte/carteira-do-atleta` | cultura-e-esporte | cpf:query, codigoInscricao:query | Model5 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/cultura-e-esporte/validacao-carteira-do-atleta/{codigoInscricao}/{codigoVerificacao}` | cultura-e-esporte | codigoInscricao:path, codigoVerificacao:path | Model5 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/educacao/cdiems/graus-de-escolaridade/{idInstituicao}` | educacao | idInstituicao:path | Model164 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/educacao/cdiems/instituicoes-de-ensino` | educacao | municipio:query | Model78 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/educacao/cdiems/municipios` | educacao | — | Model82 | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/educacao/cdiems/solicitacao` | educacao | body:Model198 | Model200 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/educacao/cdiems/solicitacao/{codigo}` | educacao | codigo:path | Model167 | keycloak | | | | |
| PUT | `/d0526/msdigital-gateway/v1/educacao/cdiems/solicitacao/{codigo}` | educacao | codigo:path \| body:Model198 | Model200 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/educacao/cdiems/validacao/{codigo}` | educacao | codigo:path | Model168 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/gov-br` | gov-br | token:query | Response | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/gov-br` | gov-br | body:Model201 | Response | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/gsi/autenticacao` | gsi | body:Model202 | Model205 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/gsi/dominios` | gsi | — | Model8 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/ibge/endereco/{cep}` | ibge | cep:path | Model84 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/ibge/estados` | ibge | — | Model11 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/ibge/municipio/{idMunicipio}` | ibge | idMunicipio:path | Model85 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/ibge/municipios-ms` | ibge | — | Model11 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/ibge/municipios/{idEstado}` | ibge | idEstado:path | Model11 | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/log/descriptografar` | log | body:Model206 | Model207 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/meio-ambiente/autorizacao-de-pesca` | meio-ambiente | cpf:query, identificacaoEstrangeira:query | Model14 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/meio-ambiente/autorizacao-de-pesca/pdf` | meio-ambiente | codigoDeSeguranca:query, cpf:query, identificacaoEstrangeira:query | Model87 | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/meio-ambiente/estrada-viva` | meio-ambiente | body:Model210 | Model212 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/meio-ambiente/previsoes` | meio-ambiente | ano:query, mes:query | Model17 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/meio-ambiente/processo-licenciamento` | meio-ambiente | cpfCnpj:query, numeroProcesso:query | string | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/mulher-ms/sos` | mulher | body:Model214 | Response | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/mulher-ms/teste-sos` | mulher | body:Model214 | Response | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/nota-premiada/{cpf}` | nota-premiada | cpf:path | Model19 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/noticias` | noticias | pagina:query | Model2 | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/procon/denuncia` | procon | body:denuncia | Response | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/procon/tipo-denuncia` | procon | — | Model22 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/procon/tipo-local` | procon | — | Model22 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/baixar-laudo-lacen` | saude | idRequisicao:query | Response | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/cartao-do-doador-de-sangue/declaracao` | saude | cpf:query, idDoador:query | Model91 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/cartao-do-doador-de-sangue/pdf` | saude | cpf:query, idDoador:query | Model92 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/cartao-do-doador-de-sangue/validacao/{token}` | saude | token:path | Model94 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/cartao-do-doador-de-sangue/{cpf}` | saude | cpf:path | Model94 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/cartao/{cpf}` | saude | cpf:path | Model89 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/carteira-de-vacinacao` | saude | cpf:query, cns:query | Model26 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/carteira-de-vacinacao/pdf` | saude | cpf:query, cns:query | Model96 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/carteira-de-vacinacao/validacao/{cpf}/{codigo}` | saude | cpf:path, codigo:path | Model26 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/estabelecimentos-de-saude` | saude | municipio:query, tipo:query, estabelecimento:query, turno:query | Model29 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/estabelecimentos-de-saude/municipios` | saude | — | Model99 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/estabelecimentos-de-saude/tipos` | saude | — | Model101 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/estabelecimentos-de-saude/turnos-de-atendimento` | saude | — | Model103 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/medicamentos` | saude | controle:query, descricao:query, fornecedor:query, cid:query, idadeMinima:query, idadeMaxima:query | Model32 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/medicamentos/cid` | saude | — | Model106 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/medicamentos/controle` | saude | — | Model109 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/medicamentos/descricao` | saude | — | Model112 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/medicamentos/idade-maxima` | saude | — | Model114 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/medicamentos/idade-minima` | saude | — | Model114 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/pdf-carteira-vacinacao-de-rotina` | saude | cpf:query | Response | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/resultado-de-exames-hemosul` | saude | cpf:query | Model35 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/resultado-exames-lacen` | saude | cpf:query, dataNascimento:query, codigoRequisicao:query, nomeMae:query | Response | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/saude/vacinacao-de-rotina` | saude | cpf:query, ordenarPor:query, desc:query, codigoVerificacao:query | Response | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/seguranca/delegacia/{idDelegacia}` | seguranca | idDelegacia:path | Model119 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/seguranca/municipios` | seguranca | — | Model39 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/seguranca/municipios/{codigoMunicipio}/delegacias` | seguranca | codigoMunicipio:path, salaLilas:query | Model170 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/autenticacao-cpf` | servidor publico | credenciais-servidor:header | Model41 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/bim/pdf/{id}` | servidor publico | id:path | Model172 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/bim/{cpf}` | servidor publico | cpf:path | Model122 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/carteira-funcional` | servidor publico | matricula:query | Model43 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/clube-beneficios/categorias` | servidor publico | — | Model125 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/clube-beneficios/parcerias/{categoria}` | servidor publico | categoria:path | Model175 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/contracheques` | servidor publico | token-servidor:header, ano:query, mes:query, numeroPerfil:query | Model47 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/contracheques/pdf` | servidor publico | token-servidor:header, ano:query, mes:query, numeroPerfil:query | Model127 | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/servidor-publico/emprego-servidor` | servidor publico | body:Model216 | Model218 | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/servidor-publico/relatorio-de-diarias/assinatura` | servidor publico | auth_relatorio_de_diarias:header \| body:Model231 | Response | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/relatorio-de-diarias/assinatura/{cpf}/concluidas` | servidor publico | auth_relatorio_de_diarias:header, cpf:path, pagina:query | Model190 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/relatorio-de-diarias/assinatura/{cpf}/pendentes` | servidor publico | auth_relatorio_de_diarias:header, cpf:path, pagina:query | Model186 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/relatorio-de-diarias/autenticacao` | servidor publico | cpf:query, rg:query, dataNascimento:query | Model129 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/relatorio-de-diarias/documento` | servidor publico | auth_relatorio_de_diarias:header, protocolo:query | Model131 | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/servidor-publico/relatorio-de-diarias/token` | servidor publico | auth_relatorio_de_diarias:header \| body:Model232 | Model234 | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/servidor-publico/relatorio-de-diarias/token-por-notificacao` | servidor publico | body:Model235 | Response | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/rendimentos` | servidor publico | token-servidor:header, ano:query, numeroPerfil:query | Model50 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/servidor-publico/validacao-carteira-funcional` | servidor publico | authorization-carteira-funcional:header | Model51 | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/servidor-publico/validacao-carteira-funcional` | servidor publico | body:Model219 | Model221 | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/transito/debitos` | transito | body:veiculo | Model225 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transito/debitos/guia-de-pagamento/{placa}/{renavam}` | transito | placa:path, renavam:path | Model192 | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/transito/infracoes` | transito | body:veiculo | string | keycloak | | | | |
| POST | `/d0526/msdigital-gateway/v1/transito/pontuacao` | transito | body:condutor | Model229 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/despesas` | transparencia-despesa | dataInicio:query, dataFim:query, unidadeGestora:query, credor:query, elementoDespesaId:query, proj_ativ_id:query | Model64 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/despesas/credores` | transparencia-despesa | credor:query | Model133 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/despesas/despesa` | transparencia-despesa | dataInicio:query, dataFim:query, elementoDespesaId:query, unidadeGestora:query, credor:query | Model134 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/despesas/detran` | transparencia-despesa | dataInicio:query, dataFim:query | Model136 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/despesas/empenhos` | transparencia-despesa | dataInicio:query, dataFim:query, unidadeGestoraCodigo:query, credorId:query, empenho:query | Model138 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/despesas/exercicios` | transparencia-despesa | — | Model140 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/despesas/orgaos/{exercicio}` | transparencia-despesa | exercicio:path | Model155 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/diarias` | transparencia-diaria | anoConsulta:query, mesConsulta:query, orgao:query, localidadeOrigem:query, nome:query, cpf:query, localidadeDestino:query, pageno:query, pagesize:query | Model66 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/diarias/destinos/{ano}` | transparencia-diaria | ano:path | Model177 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/diarias/diaria` | transparencia-diaria | idDiaria:query, tipoDiaria:query | Model142 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/diarias/exercicios` | transparencia-diaria | — | Model140 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/diarias/meses/{ano}` | transparencia-diaria | ano:path | Model179 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/diarias/orgaos/{ano}` | transparencia-diaria | ano:path | Model155 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/diarias/origens/{ano}` | transparencia-diaria | ano:path | Model180 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/passagens` | transparencia-passagens | anoConsulta:query, mesConsulta:query, orgao:query, localidadeOrigem:query, nome:query, cpf:query, localidadeDestino:query, pageno:query, pagesize:query | Model68 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/passagens/destinos/{ano}` | transparencia-passagens | ano:path | Model177 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/passagens/exercicios` | transparencia-passagens | — | Model140 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/passagens/meses/{ano}` | transparencia-passagens | ano:path | Model179 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/passagens/orgaos/{ano}` | transparencia-passagens | ano:path | Model155 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/passagens/origens/{ano}` | transparencia-passagens | ano:path | Model180 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/passagens/passagem` | transparencia-passagens | idPassagem:query | Model144 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/receitas/consolidadas` | transparencia-receitas | exercicio:query, elementId:query | Model147 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/receitas/consolidadas/anos` | transparencia-receitas | — | Model183 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/receitas/exercicios` | transparencia-receitas | — | Model140 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/receitas/meses/{ano}` | transparencia-receitas | ano:path | Model179 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/receitas/orgaos/{ano}` | transparencia-receitas | ano:path | Model155 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/receitas/pesquisas` | transparencia-receitas | exercicio:query, dataInicio:query, dataTermino:query, mesInicio:query, mesTermino:query | Model151 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/receitas/pesquisas/{orgao}` | transparencia-receitas | orgao:path, exercicio:query, dataInicio:query, dataTermino:query, mesInicio:query, mesTermino:query | Model151 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/receitas/simplificadas` | transparencia-receitas | exercicio:query, mesInicio:query, mesTermino:query | Model153 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/servidores` | transparencia-servidor | anoexercicio:query, mesCompetencia:query, orgao:query, vinculo:query, nome:query, cpf:query, situacao:query, pageno:query, pagesize:query | Model70 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/servidores/exercicios` | transparencia-servidor | — | Model140 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/servidores/meses/{ano}` | transparencia-servidor | ano:path | Model179 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/servidores/orgaos` | transparencia-servidor | — | Model155 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/servidores/situacoes` | transparencia-servidor | — | Model157 | keycloak | | | | |
| GET | `/d0526/msdigital-gateway/v1/transparencia/servidores/vinculos` | transparencia-servidor | — | Model159 | keycloak | | | | |
