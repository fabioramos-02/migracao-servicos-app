document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const docPath = urlParams.get('doc');
  
  const loading = document.getElementById('loading');
  const contentDiv = document.getElementById('docs-content');

  if (!docPath) {
    loading.textContent = 'Erro: Nenhum documento especificado na URL (?doc=...).';
    return;
  }

  fetch(docPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Documento não encontrado: ' + response.statusText);
      }
      return response.text();
    })
    .then(text => {
      // Usa marked.js para converter MD em HTML
      const html = marked.parse(text);
      contentDiv.innerHTML = html;
      loading.style.display = 'none';
      contentDiv.style.display = 'block';
    })
    .catch(error => {
      loading.textContent = 'Erro ao carregar o documento: ' + error.message;
    });
});
