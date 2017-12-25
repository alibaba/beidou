const path = require('path');
const fs = require('fs');
const debug = require('debug')('beidou:plugin:webpack');
const IsomorphicPlugin = require('../plugin/isomorphic');

module.exports.getWebpackConfig = (options, app) => {
  options = options || {};

  const eggLoader = app.loader;

  let webpackConfig = null;
  // custom config esixt
  if (options.config && fs.existsSync(options.config)) {
    webpackConfig = eggLoader.loadFile(options.config);
  }

  if (!webpackConfig) {
    const defaultConfigPath = path.resolve(__dirname, '../../config/webpack.default.config.js');
    webpackConfig = eggLoader.loadFile(defaultConfigPath);
  }

  return webpackConfig;
};

module.exports.injectEntryAndPlugin = (app) => {
  const eggLoader = app.loader;
  const entry = eggLoader.loadFile(path.join(__dirname, '../loader/entry-loader.js'));

  debug('entry auto load as below: %o', entry);

  app.IsomorphicPlugin = IsomorphicPlugin;
  app.webpackEntry = entry;
};
