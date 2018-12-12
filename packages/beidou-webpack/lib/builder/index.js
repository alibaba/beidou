'use strict';

const helper = require('../utils');
const webpack = require('webpack');

module.exports = (app, target = 'browser') => {
  helper.injectPlugin(app);
  const config = app.config.webpack;
  const webpackConfig = helper.getWebpackConfig(app, config, target);
  const compiler = webpack(webpackConfig);
  return compiler;
};
