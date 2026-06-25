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

  /** Cards de esforço de migração por tipo (aba Resumo).
   *  Lê summary.byTipo {consulta, regra, auth} e explica o esforço de cada balde.
   *  consulta = leitura (fácil) · regra = precisa ficha (difícil) · auth = técnico. */
  App.renderTipos = function (el, byTipo) {
    if (!el) return;
    var bt = byTipo || {};
    var defs = [
      ["consulta", bt.consulta || 0, "leitura — Swagger ≈ suficiente"],
      ["regra", bt.regra || 0, "regra de negócio — precisa da ficha"],
      ["auth", bt.auth || 0, "autenticação/infra — técnico à parte"]
    ];
    el.innerHTML = defs.map(function (d) {
      return '<div class="card kpi tipo-card">' +
        '<span class="tipo tipo-' + d[0] + '">' + d[0] + '</span>' +
        '<span class="kpi-num">' + App.esc(d[1]) + '</span>' +
        '<span class="kpi-lbl">' + App.esc(d[2]) + '</span></div>';
    }).join("");
  };

  var MEDALHAS = ["🥇", "🥈", "🥉"];

  /** Faixa de impacto pela largura relativa ao líder (0–100%). Cores via tokens DS-MS:
   *  azul claro → médio → escuro conforme o volume sobe; verde marca o(s) de maior impacto. */
  App.tierBarra = function (fillPct) {
    if (fillPct >= 75) return "tier-verde";
    if (fillPct >= 50) return "tier-azul-escuro";
    if (fillPct >= 25) return "tier-azul-medio";
    return "tier-azul-claro";
  };

  /** Ranking de serviços por volume de endpoints (aba Priorização).
   *  - posição: medalha (top 3) ou número;
   *  - barra: largura RELATIVA AO LÍDER (o serviço líder enche a trilha) — leitura de ranking;
   *  - rótulo: nº de APIs + % do total (métrica real);
   *  - cor: faixa de impacto (App.tierBarra).
   *  Paginada de 10 em 10 (reusa App.paginar); rank é contínuo entre páginas.
   *  Render puro — estado/controles ficam em main.js. Devolve { pagina, totalPaginas }. */
  App.renderBarras = function (el, byTag, pagina) {
    var tags = Object.keys(byTag || {});
    if (!tags.length) { el.innerHTML = ""; return { pagina: 1, totalPaginas: 1 }; }

    var total = tags.reduce(function (s, t) { return s + byTag[t]; }, 0);
    var ordenadas = tags.slice().sort(function (a, b) { return byTag[b] - byTag[a]; });
    var max = byTag[ordenadas[0]] || 1;
    var pg = App.paginar(ordenadas, pagina, 10);
    var base = (pg.pagina - 1) * 10;
    var esc = App.esc;

    el.innerHTML = pg.itens.map(function (t, i) {
      var n = byTag[t];
      var rank = base + i + 1;
      var share = (n / total) * 100;          // % do total — rótulo
      var fill = (n / max) * 100;             // largura relativa ao líder
      var tier = App.tierBarra(fill);
      var shareTxt = share.toFixed(1).replace(".", ",");
      var rankCell = rank <= 3
        ? '<span class="bar-rank" role="img" aria-label="' + rank + 'º lugar">' + MEDALHAS[rank - 1] + '</span>'
        : '<span class="bar-rank bar-rank--n">' + rank + '</span>';
      return '<div class="bar-row">' +
        rankCell +
        '<span class="svc">' + esc(t) + '</span>' +
        '<span class="bar-track"><span class="bar-fill ' + tier + '" style="width:' +
          fill.toFixed(1) + '%"></span></span>' +
        '<span class="bar-num"><strong>' + n + '</strong> APIs<small>' + shareTxt + '% do total</small></span>' +
      '</div>';
    }).join("");

    return { pagina: pg.pagina, totalPaginas: pg.totalPaginas };
  };
})();
