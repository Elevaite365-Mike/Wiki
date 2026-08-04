#!/usr/bin/env bash
# Builds both projects into site/.
#   site/            the Help Centre
#   site/agreements/ the Agreements sub-site
#
# Shared brand assets live in docs/assets/ and are copied into the agreements
# project at build time, so there is one source of truth for the theme.
set -euo pipefail
cd "$(dirname "$0")"
# Material prints an advocacy notice about MkDocs 2.0 on every build. It is
# not about this project. Its own opt-out:
export NO_MKDOCS_2_WARNING=1


MKDOCS="${MKDOCS:-.venv/bin/mkdocs}"

echo "==> Syncing shared assets"
mkdir -p agreements/docs/assets
cp docs/assets/brand.css docs/assets/logo.png docs/assets/navbg.png agreements/docs/assets/

echo "==> Building Help Centre"
"$MKDOCS" build

echo "==> Building Agreements"
(cd agreements && "../$MKDOCS" build --site-dir ../site/agreements)

echo "==> Done. Output in site/"
