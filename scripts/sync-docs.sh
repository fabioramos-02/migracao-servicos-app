#!/usr/bin/env bash
# sync-docs.sh — copia os docs Markdown (GCS) pra dentro de site/docs-src,
# pq o GitHub Pages só publica o conteúdo de site/. Sem isso docs.html 404 em
# qualquer link que aponte pra fora da pasta publicada (../02-estudos/...).
set -euo pipefail
cd "$(dirname "$0")/.."

DEST="site/docs-src"
rm -rf "$DEST"
mkdir -p "$DEST"

for dir in 00-gestao 02-estudos 04-modelagem; do
  if [ -d "$dir" ]; then
    mkdir -p "$DEST/$dir"
    cp "$dir"/*.md "$DEST/$dir/" 2>/dev/null || true
  fi
done

# README na raiz também é abrível no viewer (docs.html)
cp README.md "$DEST/README.md" 2>/dev/null || true

echo "docs sincronizados em $DEST"
