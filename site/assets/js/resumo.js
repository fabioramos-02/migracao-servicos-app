/* resumo.js — responsabilidade única: renderizar os KPIs e as barras por serviço. */
(function () {
  "use strict";
  window.App = window.App || {};

  /** KPIs da aba Resumo. */
  App.renderResumo = function (el, summary, info) {
    var kpis = [
      [summary.totalEndpoints, "endpoints (operações)"],
      [Object.keys(summary.byTag || {}).length, "serviços (tags)"],
      [summary.totalSchemas, "schemas (definitions)"],
      [Object.keys(summary.authSchemes || {}).join(", ") || "—", "esquema de auth"]
    ];
    el.innerHTML = kpis.map(function (k) {
      return '<div class="card kpi"><span class="kpi-num">' + App.esc(k[0]) +
        '</span><span class="kpi-lbl">' + App.esc(k[1]) + '</span></div>';
    }).join("");
  };

  /** Barras horizontais por serviço (aba Priorização).
   *  A barra é uma barra de progresso: largura = quanto o serviço representa do TOTAL (% de 100%).
   *  Paginada de 10 em 10 (reusa App.paginar). Render puro — estado/controles ficam em main.js.
   *  Devolve { pagina, totalPaginas } pra main.js atualizar os botões. */
  App.renderBarras = function (el, byTag, pagina) {
    var tags = Object.keys(byTag || {});
    if (!tags.length) { el.innerHTML = ""; return { pagina: 1, totalPaginas: 1 }; }

    var total = tags.reduce(function (s, t) { return s + byTag[t]; }, 0);
    var ordenadas = tags.sort(function (a, b) { return byTag[b] - byTag[a]; });
    var pg = App.paginar(ordenadas, pagina, 10);

    el.innerHTML = pg.itens.map(function (t) {
      var n = byTag[t], pct = (n / total) * 100;
      var pctTxt = pct.toFixed(1).replace(".", ",");
      return '<div class="bar-row">' +
        '<span class="svc">' + App.esc(t) + '</span>' +
        '<span class="bar-track"><span class="bar-fill" style="width:' + pct.toFixed(2) + '%"></span></span>' +
        '<strong class="bar-num">' + n + ' (' + pctTxt + '%)</strong></div>';
    }).join("");

    return { pagina: pg.pagina, totalPaginas: pg.totalPaginas };
  };
})();
