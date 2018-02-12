#!/usr/bin/env node

'use strict';

const process = require('process');
const argv = require('argh').argv;
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

// build in production environment as default
app.config.env = argv.dev ? 'local' : 'prod';

const target = argv.target;

if (target && !['node', 'browser'].includes(target)) {
  app.coreLogger.error(
    `Expect execute environment to be "node" or "browser"(default), got ${target}`
  );
  process.exit(1);
}

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
