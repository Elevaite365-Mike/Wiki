#!/usr/bin/env bash
# Builds both projects into site/.
#   site/            the Help Centre
#   site/agreements/ the Agreements sub-site
#
# Shared brand assets live in docs/assets/ and are copied into the agreements
# project at build time, so there is one source of truth for the theme.
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$PWD"

# Material prints an advocacy notice about MkDocs 2.0 on every build. It is
# not about this project. Its own opt-out:
export NO_MKDOCS_2_WARNING=1

# MKDOCS may be a path (the local venv) or a bare command name (CI, where it is
# on PATH). Resolve a path to absolute so it survives the cd into agreements/,
# and leave a bare command name alone so PATH lookup still happens.
MKDOCS="${MKDOCS:-.venv/bin/mkdocs}"
if [[ "$MKDOCS" == */* ]]; then
  MKDOCS="$ROOT/${MKDOCS#./}"
fi

echo "==> Syncing shared assets"
mkdir -p agreements/docs/assets
cp docs/assets/brand.css docs/assets/logo.png docs/assets/navbg.png agreements/docs/assets/

echo "==> Building Help Centre"
"$MKDOCS" build

echo "==> Building Agreements"
(cd agreements && "$MKDOCS" build --site-dir "$ROOT/site/agreements")

echo "==> Done. Output in site/"
