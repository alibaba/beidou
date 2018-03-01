#!/usr/bin/env node

'use strict';

const process = require('process');
const { argv } = require('argh');
const fs = require('fs');
const path = require('path');
const { Application } = require('beidou-core');
const Loader = require('beidou-core').AppWorkerLoader;
const builder = require('../lib/builder');

// set serverEnv=local to ensure webpack plugin enable
process.env.EGG_SERVER_ENV = 'local';

Loader.prototype.load = function () {};

const app = new Application({
  baseDir: process.cwd(),
  workers: 1,
});

// build in production environment as default
app.config.env = argv.dev ? 'local' : 'prod';

const { target } = argv;

if (target && !['node', 'browser'].includes(target)) {
  app.coreLogger.error(
    `Expect target to be "node" or "browser"(default), got ${target}`
  );
  process.exit(1);
}

app.coreLogger.info(`Target is ${target}`);
const compiler = builder(app, target);

compiler.run((err, stats) => {
  if (err) {
    app.coreLogger.error(err);
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
  app.close();
});
