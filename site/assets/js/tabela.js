/* tabela.js — responsabilidade única: renderizar a listagem de endpoints.
   Um único caminho de render (<td data-label>); o CSS vira cards no mobile. */
(function () {
  "use strict";
  window.App = window.App || {};

  function requestResumo(e) {
    var req = (e.reqParams || []).join(", ");
    if (e.reqBody) req = (req ? req + " · " : "") + "body: " + e.reqBody;
    return req || "—";
  }

  /**
   * @param {HTMLElement} tbody  <tbody> alvo
   * @param {Array} itens        endpoints da página atual
   */
  App.renderTabela = function (tbody, itens) {
    if (!itens.length) {
      tbody.innerHTML = '<tr><td colspan="7" class="vazio">Nenhum endpoint para o filtro atual.</td></tr>';
      return;
    }
    var esc = App.esc;
    tbody.innerHTML = itens.map(function (e) {
      var tipo = e.tipo || "consulta";
      return '<tr>' +
        '<td data-label="Método"><span class="m m-' + esc(e.method) + '">' + esc(e.method) + '</span></td>' +
        '<td data-label="Path"><code>' + esc(e.path) + '</code>' +
          (e.summary ? '<span class="sum">' + esc(e.summary) + '</span>' : '') + '</td>' +
        '<td data-label="Serviço"><span class="svc">' + esc(e.tag) + '</span></td>' +
        '<td data-label="Tipo"><span class="tipo tipo-' + esc(tipo) + '">' + esc(tipo) + '</span></td>' +
        '<td data-label="Request">' + esc(requestResumo(e)) + '</td>' +
        '<td data-label="Response">' + esc(e.respSchema || '—') + '</td>' +
        '<td data-label="Auth">' + esc(e.auth) + '</td>' +
      '</tr>';
    }).join("");
  };
})();
