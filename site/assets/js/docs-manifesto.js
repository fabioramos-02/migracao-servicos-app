/* docs-manifesto.js — responsabilidade única: lista dos documentos abríveis.
   Fonte única do índice lateral (docs.js lê daqui). Para adicionar um doc,
   inclua uma entrada aqui — o caminho é relativo a site/ (ver scripts/sync-docs.sh). */
(function () {
  "use strict";
  window.DOCS = [
    {
      grupo: "Estudos",
      itens: [
        { titulo: "Estratégia de migração", doc: "docs-src/02-estudos/analise-migracao-apis.md" },
        { titulo: "Padrão Strangler Fig", doc: "docs-src/02-estudos/padrao-strangler-fig.md" },
        { titulo: "Priorização por uso", doc: "docs-src/02-estudos/priorizacao-por-uso.md" }
      ]
    },
    {
      grupo: "Modelagem",
      itens: [
        { titulo: "Resumo do gateway", doc: "docs-src/04-modelagem/resumo-do-gateway.md" },
        { titulo: "Ficha de regra de negócio", doc: "docs-src/04-modelagem/template-regra-negocio.md" }
      ]
    },
    {
      grupo: "Gestão",
      itens: [
        { titulo: "Pauta da reunião com o Maycon", doc: "docs-src/00-gestao/pauta-reuniao-maycon.md" }
      ]
    }
  ];
})();
