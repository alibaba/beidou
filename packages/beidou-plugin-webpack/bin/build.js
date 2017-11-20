#!/usr/bin/env node
const process = require('process');
const fs = require('fs');
const path = require('path');
const Application = require('beidou-core').Application;
const Loader = require('beidou-core').AppWorkerLoader;
const builder = require('../lib/builder');

Loader.prototype.load = function () {};

const app = new Application({
  baseDir: process.cwd(),
});

// build in production environment
app.config.env = 'prod';
const compiler = builder(app);

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
  }
  if (stats) {
    fs.writeFileSync(path.join(process.cwd(), '.stats.json'), stats);
    console.log(stats.toString({
      colors: true,
      children: false,
    }));
  }
});

app.close();
