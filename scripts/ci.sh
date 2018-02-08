#!/bin/sh

set -e

TEST_DIRS=""

for f in packages/*; do
  if [ -d "$f/test" ]; then
    TEST_DIRS="$f"
    cd $TEST_DIRS
    lerna bootstrap
    npm run cov
    cd ../..
  fi
done
