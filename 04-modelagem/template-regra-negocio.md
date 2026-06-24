# Ficha de Regra de Negócio por Serviço

> Preencher uma ficha por serviço **antes** de a X-VIA reconstruí-lo. Captura o que o Swagger
> **não** carrega — a lógica por trás do contrato. Fonte: doc dos módulos EDS, código-fonte,
> sessão de transferência técnica.

---

## Serviço: `<nome do serviço>`

**Módulo EDS de origem:** `<Control / Admin / Atendimento / Integrador / FormFlow / CMS>`
**Endpoints relacionados:** `<lista de paths do inventário>`
**Owner da regra de negócio (quem responde):** `<nome / e-mail>`
**Lote de migração:** `<1 / 2 / 3>`

### 1. Para que serve (visão funcional)
`<o que o serviço faz, do ponto de vista do cidadão / do negócio>`

### 2. Entradas e validações
- Campo `<x>`: `<regra de validação — formato, faixa, obrigatoriedade condicional>`
- `<...>`

### 3. Fluxo / orquestração
`<passo a passo: o que chama o quê, em que ordem; dependências de outros serviços>`

### 4. Máquina de estados (se houver)
`<estados possíveis e transições — ex.: solicitado → em análise → deferido/indeferido>`

### 5. Integrações downstream
- `<sistema/serviço externo>`: `<o que troca, síncrono/assíncrono, contrato>`

### 6. Side-effects
`<o que acontece além da resposta: grava em tabela X, dispara notificação, gera protocolo, etc.>`

### 7. Regras de autorização
`<quem pode chamar; perfis; SmartPass/Gov.br; escopos>`

### 8. Requisitos não-funcionais
- SLA / tempo de resposta esperado: `<...>`
- Rate limit: `<...>`
- Volume/pico: `<...>`
- Idempotência: `<sim/não — relevante p/ pagamento e transação>`

### 9. Dados sensíveis (LGPD)
`<quais campos são pessoais/sensíveis; base legal; necessidade de consentimento>`

### 10. Pontos em aberto / gaps
- [ ] `<dúvida a confirmar com EDS/X-VIA>`
