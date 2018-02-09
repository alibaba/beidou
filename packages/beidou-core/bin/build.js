#!/usr/bin/env node

'use strict';

const process = require('process');
const fs = require('fs');
const path = require('path');
const { Application } = require('../index');
const Loader = require('../index').AppWorkerLoader;
const builder = require('beidou-webpack/lib/builder');

Loader.prototype.load = function () {};

const app = new Application({
  baseDir: process.cwd(),
  workers: 1,
});

// build in production environment
app.config.env = 'prod';

const execEnv = process.argv[2];
if (execEnv && !['node', 'browser'].includes(execEnv)) {
  app.coreLogger.error(
    `Expect execute environment to be "node" or "browser"(default), got ${execEnv}`
  );
  process.exit(1);
}

const compiler = builder(app, execEnv);

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  if (stats) {
    fs.writeFileSync(path.join(process.cwd(), '.stats.json'), stats);
    console.log(
      stats.toString({
        colors: true,
        children: false,
      })
    );
  }

  console.log('\nBuild finished\n');
  app.close().then(() => process.exit(0));
});
