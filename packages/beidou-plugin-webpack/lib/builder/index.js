'use strict';

const webpack = require('webpack');
const helper = require('../utils');

module.exports = (app, execEnv = 'browser') => {
  helper.injectPlugin(app);
  const config = app.config.webpack;
  const webpackConfig = helper.getWebpackConfig(app, config, execEnv);

  const compiler = webpack(webpackConfig);
  return compiler;
};
