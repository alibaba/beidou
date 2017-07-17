
const webpack = require('webpack');
const helper = require('./utils/index');

module.exports = (app) => {
  const config = app.config.webpack;
  const webpackConfig = helper.getWebpackConfig(config, app);
  const compiler = webpack(webpackConfig);

  return compiler;
};
