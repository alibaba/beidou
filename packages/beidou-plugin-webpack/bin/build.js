#!/usr/bin/env node

'use strict';

const process = require('process');
const fs = require('fs');
const path = require('path');
const Application = require('beidou-core').Application;
const Loader = require('beidou-core').AppWorkerLoader;
const builder = require('../lib/builder');
const helper = require('../lib/utils');

Loader.prototype.load = function () {};

const app = new Application({
  baseDir: process.cwd(),
});

// build in production environment
app.config.env = 'prod';

helper.injectEntryAndPlugin(app);

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
});

app.close();
