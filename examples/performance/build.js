const { Application } = require('beidou-core');
const { Loader } = require('beidou-core');
const builder = require('beidou-plugin-webpack/builder');

Loader.prototype.load = function () {};

const app = new Application({
  baseDir: __dirname,
});

const compiler = builder(app);

compiler.run(() => {});

app.close();
