# Priorização da Migração por Uso (BI do APP)

> Fonte: BI `https://bench-perfil.streamlit.app/` — acessos por categoria e serviço do APP.
> **Pendente de ingestão** (BI gated). Tabela abaixo é o template; preencher com os números reais.

## Por que priorizar por uso

Na estratégia strangler fig, a ordem importa. **Serviços mais acessados migram primeiro** porque
concentram valor para o cidadão e risco (qualquer falha afeta mais gente). Isso define a composição
dos lotes do Plano PGD-MS (lote 1 = arquétipos de maior tração).

## Critério de priorização

`Prioridade = f(volume de acesso, criticidade do serviço, complexidade técnica)`

- **Volume de acesso** (BI): quanto mais usado, mais cedo.
- **Criticidade**: serviço essencial vs informativo.
- **Complexidade**: 1º e 2º serviços devem ser **arquétipos** (cobrir os padrões mais difíceis:
  auth/SmartPass, pagamento, transação), não os mais fáceis — para a curva de aprendizado valer.


## Observações de método

- Registrar o **período** dos números (ex.: últimos 12 meses) para comparabilidade.
- Se o BI mede APP (MS Digital), cruzar com o tráfego web (Matomo idSite=298) quando o serviço
  existir nos dois canais — evita priorizar só pela métrica de um canal.
