/* main.js — orquestra: estado, eventos e wiring entre os módulos.
   Único módulo que conhece o DOM da página inteira e mantém o estado. */
(function () {
  "use strict";
  window.App = window.App || {};

  // util compartilhado (escape de HTML) — usado por tabela.js e resumo.js
  App.esc = function (v) {
    return String(v == null ? "" : v).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };

  var TAM_PAGINA = 15;

  document.addEventListener("DOMContentLoaded", function () {
    var D = window.INVENTARIO || { endpoints: [], summary: {}, info: {} };
    var summary = D.summary || {};

    // ---- Resumo ----
    var leadInfo = document.getElementById("lead-info");
    if (leadInfo) {
      leadInfo.textContent = (D.info.title || "Gateway") + " v" + (D.info.version || "") +
        " · host " + (D.info.host || "—");
    }
    App.renderResumo(document.getElementById("kpis"), summary, D.info);
    App.renderBarras(document.getElementById("bars"), summary.byTag);

    // ---- Selects de filtro ----
    var selTag = document.getElementById("f-tag");
    Object.keys(summary.byTag || {}).sort().forEach(function (t) {
      selTag.insertAdjacentHTML("beforeend",
        '<option value="' + App.esc(t) + '">' + App.esc(t) + " (" + summary.byTag[t] + ")</option>");
    });
    var selMet = document.getElementById("f-metodo");
    Object.keys(summary.byMethod || {}).forEach(function (m) {
      selMet.insertAdjacentHTML("beforeend", '<option value="' + App.esc(m) + '">' + App.esc(m) + "</option>");
    });

    // ---- Estado + elementos ----
    var estado = { busca: "", tag: "", metodo: "", pagina: 1 };
    var inputBusca = document.getElementById("busca");
    var tbody = document.getElementById("tbody");
    var contador = document.getElementById("count");
    var infoPag = document.getElementById("pag-info");
    var btnPrev = document.getElementById("pag-prev");
    var btnNext = document.getElementById("pag-next");
    var btnLimpar = document.getElementById("limpar");

    function atualizar() {
      var filtrados = App.filtrar(D.endpoints, estado);
      var pg = App.paginar(filtrados, estado.pagina, TAM_PAGINA);
      estado.pagina = pg.pagina;

      App.renderTabela(tbody, pg.itens);
      contador.textContent = filtrados.length + " de " + D.endpoints.length + " endpoints";
      infoPag.textContent = "Página " + pg.pagina + " de " + pg.totalPaginas;
      btnPrev.disabled = pg.pagina <= 1;
      btnNext.disabled = pg.pagina >= pg.totalPaginas;
    }

    function resetPagina(fn) { return function (e) { fn(e); estado.pagina = 1; atualizar(); }; }

    inputBusca.addEventListener("input", resetPagina(function () { estado.busca = inputBusca.value; }));
    selTag.addEventListener("change", resetPagina(function () { estado.tag = selTag.value; }));
    selMet.addEventListener("change", resetPagina(function () { estado.metodo = selMet.value; }));
    btnLimpar.addEventListener("click", function () {
      estado = { busca: "", tag: "", metodo: "", pagina: 1 };
      inputBusca.value = ""; selTag.value = ""; selMet.value = "";
      atualizar();
    });
    btnPrev.addEventListener("click", function () { estado.pagina -= 1; atualizar(); });
    btnNext.addEventListener("click", function () { estado.pagina += 1; atualizar(); });

    App.initAbas();
    atualizar();
  });
})();
