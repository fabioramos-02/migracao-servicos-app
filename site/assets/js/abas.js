/* abas.js — responsabilidade única: navegação por abas acessível (ARIA tabs).
   Teclado: ←/→ navegam; clique ativa. Mostra só o painel selecionado. */
(function () {
  "use strict";
  window.App = window.App || {};

  App.initAbas = function () {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    function ativar(tab) {
      tabs.forEach(function (t) {
        var sel = t === tab;
        t.setAttribute("aria-selected", String(sel));
        t.tabIndex = sel ? 0 : -1;
        var painel = document.getElementById(t.getAttribute("aria-controls"));
        if (painel) painel.hidden = !sel;
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { ativar(tab); });
      tab.addEventListener("keydown", function (e) {
        var idx = null;
        if (e.key === "ArrowRight") idx = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") idx = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") idx = 0;
        else if (e.key === "End") idx = tabs.length - 1;
        if (idx !== null) { e.preventDefault(); tabs[idx].focus(); ativar(tabs[idx]); }
      });
    });

    ativar(tabs[0]);
  };
})();
