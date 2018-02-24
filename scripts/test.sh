#!/bin/sh

set -e

node="node"

if [ "$TEST_DEBUG" ]; then
   node="node --inspect --debug-brk"
fi

TEST_DIRS=""

for f in packages/*; do
  if [ -d "$f/test" ]; then
    TEST_DIRS="$f"
    cd $TEST_DIRS
    npm run test
    cd ../..
  fi
done
