#!/usr/bin/env node

'use strict';

const process = require('process');
const { argv } = require('argh');
const fs = require('fs');
const path = require('path');
const builder = require('../lib/builder');

const { target, framework, dev } = argv;

const { Application } = require(framework);
const Loader = require(framework).AppWorkerLoader;

// set serverEnv=local to ensure webpack plugin enable
process.env.EGG_SERVER_ENV = 'local';

Loader.prototype.load = function () {};

const app = new Application({
  baseDir: process.cwd(),
  workers: 1,
});

const originEnv = app.config.env;

// webpack build only works in local environment
// force env to local and reload config
if (originEnv !== 'local') {
  app.loader.serverEnv = 'local';
  app.loader.dirs = null;
  app.config.env = 'local';
  app.loader.loadConfig();
  // restore
  app.loader.serverEnv = originEnv;
  app.config.env = originEnv;
}

// build in production environment as default
app.config.env = dev ? 'local' : 'prod';

if (target && !['node', 'browser'].includes(target)) {
  console.error(
    `Expect target to be "node" or "browser"(default), got ${target}`
  );
  process.exit(1);
}

console.info(`Target is ${target}`);
const compiler = builder(app, target);

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  if (stats) {
    fs.writeFileSync(path.join(process.cwd(), '.stats'), stats);
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
