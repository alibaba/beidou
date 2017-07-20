const Application = require('beidou-core').Application;
const Loader = require('beidou-core').AppWorkerLoader;
const builder = require('beidou-plugin-webpack/builder');

Loader.prototype.load = function () {
};

const app = new Application({
  baseDir: __dirname,
});

const compiler = builder(app);

compiler.run(() => {

});

app.close();
