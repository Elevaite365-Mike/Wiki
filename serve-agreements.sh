#!/usr/bin/env bash
# Previews the Agreements sub-site on its own at http://127.0.0.1:8001
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$PWD"

# Material prints an advocacy notice about MkDocs 2.0 on every build. It is
# not about this project. Its own opt-out:
export NO_MKDOCS_2_WARNING=1

# See build.sh: resolve a path to absolute, leave a bare command name alone.
MKDOCS="${MKDOCS:-.venv/bin/mkdocs}"
if [[ "$MKDOCS" == */* ]]; then
  MKDOCS="$ROOT/${MKDOCS#./}"
fi

mkdir -p agreements/docs/assets
cp docs/assets/brand.css docs/assets/logo.png docs/assets/navbg.png agreements/docs/assets/

cd agreements
exec "$MKDOCS" serve -a 127.0.0.1:8001
