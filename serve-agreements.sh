#!/usr/bin/env bash
# Previews the Agreements sub-site on its own at http://127.0.0.1:8001
set -euo pipefail
cd "$(dirname "$0")"
# Material prints an advocacy notice about MkDocs 2.0 on every build. It is
# not about this project. Its own opt-out:
export NO_MKDOCS_2_WARNING=1

mkdir -p agreements/docs/assets
cp docs/assets/brand.css docs/assets/logo.png docs/assets/navbg.png agreements/docs/assets/
cd agreements
exec "../${MKDOCS:-.venv/bin/mkdocs}" serve -a 127.0.0.1:8001
