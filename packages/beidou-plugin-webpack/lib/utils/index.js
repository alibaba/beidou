/* eslint import/no-dynamic-require: off */

'use strict'; // eslint-disable-line
const path = require('path');
const fs = require('fs');

module.exports.getWebpackConfig = (options, app) => {
  options = options || {};

  const defaultConfigPath = path.resolve(__dirname, '../../config/default.webpack.config.js');
  const eggLoader = app.loader;

  let webpackConfig = null;
  // custom config esixt
  if (options.config && fs.existsSync(options.config)) {
    webpackConfig = eggLoader.loadFile(options.config);
  }

  if (!webpackConfig) {
    webpackConfig = eggLoader.loadFile(defaultConfigPath);
  }

  return webpackConfig;
};
