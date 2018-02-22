#!/bin/sh

# Regenerate examples yarn.lock and symlink by lerna,
# this script fix examples yark.lock lost local dependencies.
# Should run this script before publish example packages

set -e

for f in examples/*; do
  if [ -f "$f/package.json" ]; then
    cd "$f"
    yarn
    cd ../..
  fi
done

lerna bootstrap
