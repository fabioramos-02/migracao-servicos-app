/* paginacao.js — responsabilidade única: fatiar uma lista em páginas.
   Função pura. Corrige página fora de faixa. Sem DOM, sem estado. */
(function () {
  "use strict";
  window.App = window.App || {};

  /**
   * @param {Array} itens
   * @param {number} pagina  página desejada (1-based)
   * @param {number} tamanho itens por página (default 15)
   * @returns {{itens:Array, pagina:number, totalPaginas:number, totalItens:number}}
   */
  App.paginar = function (itens, pagina, tamanho) {
    tamanho = tamanho || 15;
    var totalPaginas = Math.max(1, Math.ceil(itens.length / tamanho));
    var p = Math.min(Math.max(1, pagina || 1), totalPaginas);
    var inicio = (p - 1) * tamanho;
    return {
      itens: itens.slice(inicio, inicio + tamanho),
      pagina: p,
      totalPaginas: totalPaginas,
      totalItens: itens.length
    };
  };
})();
