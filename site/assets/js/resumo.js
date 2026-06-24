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

  /** Barras horizontais de endpoints por serviço (aba Priorização). */
  App.renderBarras = function (el, byTag) {
    var tags = Object.keys(byTag || {});
    if (!tags.length) { el.innerHTML = ""; return; }
    var max = Math.max.apply(null, tags.map(function (t) { return byTag[t]; }));
    el.innerHTML = tags
      .sort(function (a, b) { return byTag[b] - byTag[a]; })
      .map(function (t) {
        var n = byTag[t], pct = Math.round((n / max) * 100);
        return '<div class="bar-row">' +
          '<span class="svc">' + App.esc(t) + '</span>' +
          '<span class="bar-track"><span class="bar-fill" style="width:' + pct + '%"></span></span>' +
          '<strong class="bar-num">' + n + '</strong></div>';
      }).join("");
  };
})();
