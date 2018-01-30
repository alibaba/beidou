'use strict';

const webpack = require('webpack');
const helper = require('../utils');

/**
 * Pack project
 * @param {Beidou.Application} app
 * @param {string} execEnv 'node' or 'browser'
 */
module.exports = (app, execEnv = 'browser') => {
  const config = app.config.webpack;
  const webpackConfig = helper.getWebpackConfig(app, config, execEnv);

  const compiler = webpack(webpackConfig);
  return compiler;
};
