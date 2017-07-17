#!/bin/sh

set -e

node="node"

if [ "$TEST_DEBUG" ]; then
   node="node --inspect --debug-brk"
fi

$node node_modules/.bin/egg-bin test