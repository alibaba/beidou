#!/bin/bash

NODE_KILL=`which node-kill`

if [ -f "$HOME/.nodepath" ]; then
  echo $HOME;
  NODE_KILL=`cat $HOME/.nodepath`/node-kill;
fi

$NODE_KILL --start_profiling $1