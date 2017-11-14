#!/bin/sh
# deprecated

set -e

INSTALL_DIRS=""

for f in examples/*; do
  if [ -f "$f/package.json" ]; then
    INSTALL_DIRS="$f"
    cd $INSTALL_DIRS
    yarn install
    cd ../..
  fi
done
