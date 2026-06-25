/* docs.js — carrega o MD pedido na URL (?doc=...), renderiza com marked
   e monta o índice lateral a partir de window.DOCS (docs-manifesto.js). */
(function () {
  "use strict";

  function renderIndice(docAtivo) {
    var nav = document.getElementById("docs-nav");
    if (!nav || !window.DOCS) return;
    var html = "";
    window.DOCS.forEach(function (g) {
      html += '<h2>' + g.grupo + "</h2><ul>";
      g.itens.forEach(function (it) {
        var ativo = it.doc === docAtivo ? ' class="ativo" aria-current="page"' : "";
        html += '<li><a href="docs.html?doc=' + encodeURIComponent(it.doc) + '"' + ativo + ">" +
          it.titulo + "</a></li>";
      });
      html += "</ul>";
    });
    nav.innerHTML = html;
  }

  /* Reescreve links relativos .md (ex.: template-regra-negocio.md, ../04-modelagem/x.md)
     para docs.html?doc=docs-src/<caminho resolvido>, senão o link resolve contra docs.html
     (raiz do site) e dá 404. Links http(s)/âncora/mailto ficam intactos. */
  function reescreverLinksMd(container, docAtivo) {
    var dir = docAtivo.replace(/[^/]*$/, ""); // ex.: docs-src/04-modelagem/
    container.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (/^(https?:|#|mailto:)/.test(href)) return;
      if (!/\.md($|[?#])/.test(href)) return;
      // resolve o caminho relativo (trata ../) usando URL com base fictícia
      var alvo = new URL(href, "http://x/" + dir).pathname.slice(1);
      a.setAttribute("href", "docs.html?doc=" + encodeURIComponent(alvo));
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var docPath = new URLSearchParams(window.location.search).get("doc");
    var loading = document.getElementById("loading");
    var contentDiv = document.getElementById("docs-content");

    renderIndice(docPath);

    if (!docPath) {
      loading.textContent = "Selecione um documento no índice ao lado.";
      return;
    }

    fetch(docPath)
      .then(function (r) {
        if (!r.ok) throw new Error("Documento não encontrado: " + r.statusText);
        return r.text();
      })
      .then(function (text) {
        contentDiv.innerHTML = marked.parse(text);
        reescreverLinksMd(contentDiv, docPath);
        loading.style.display = "none";
        contentDiv.style.display = "block";
      })
      .catch(function (err) {
        loading.textContent = "Erro ao carregar o documento: " + err.message;
      });
  });
})();
