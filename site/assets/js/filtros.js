/* filtros.js — responsabilidade única: filtrar a lista de endpoints.
   Função pura: recebe lista + critérios, devolve nova lista. Sem DOM, sem estado. */
(function () {
  "use strict";
  window.App = window.App || {};

  /**
   * @param {Array} endpoints  lista completa
   * @param {{busca?:string, tag?:string, metodo?:string, tipo?:string}} criterios
   * @returns {Array} subconjunto que satisfaz tag E método E tipo E busca
   */
  App.filtrar = function (endpoints, criterios) {
    var q = (criterios.busca || "").trim().toLowerCase();
    var tag = criterios.tag || "";
    var metodo = criterios.metodo || "";
    var tipo = criterios.tipo || "";

    return endpoints.filter(function (e) {
      if (tag && e.tag !== tag) return false;
      if (metodo && e.method !== metodo) return false;
      if (tipo && e.tipo !== tipo) return false;
      if (q) {
        var alvo = (e.path + " " + (e.summary || "")).toLowerCase();
        if (alvo.indexOf(q) === -1) return false;
      }
      return true;
    });
  };
})();
