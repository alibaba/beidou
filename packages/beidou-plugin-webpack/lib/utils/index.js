'use strict';

const path = require('path');
const fs = require('fs');
const debug = require('debug')('beidou:plugin:webpack');
const IsomorphicPlugin = require('../plugin/isomorphic');

module.exports.getWebpackConfig = (app, options = {}, execEnv = 'browser') => {
  const eggLoader = app.loader;

  // TODO: Custom webpack config with extends default config
  // custom config exists
  if (options.config && fs.existsSync(options.config)) {
    return eggLoader.loadFile(options.config);
  }

  const relativePath =
    execEnv === 'node'
      ? '../../config/webpack.node.js'
      : '../../config/webpack.browser.js';

  const defaultConfigPath = path.resolve(__dirname, relativePath);
  return eggLoader.loadFile(defaultConfigPath);
};

module.exports.injectEntryAndPlugin = (app) => {
  const eggLoader = app.loader;
  const entry = eggLoader.loadFile(
    path.join(__dirname, '../loader/entry-loader.js')
  );

  debug('entry auto load as below: %o', entry);

  app.IsomorphicPlugin = IsomorphicPlugin;
  app.webpackEntry = entry;
};
