#!/usr/bin/env bash
# Previews the Agreements sub-site on its own at http://127.0.0.1:8001
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p agreements/docs/assets
cp docs/assets/brand.css docs/assets/logo.png docs/assets/navbg.png agreements/docs/assets/
cd agreements
exec "../${MKDOCS:-.venv/bin/mkdocs}" serve -a 127.0.0.1:8001
