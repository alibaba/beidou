#!/bin/sh

set -e

npm run cov

TEST_DIRS=""

for f in packages/*; do
  if [ -d "$f/test" ]; then
    TEST_DIRS="$f"
    cd $TEST_DIRS
    npm run cov
    cd ../..
  fi
done
