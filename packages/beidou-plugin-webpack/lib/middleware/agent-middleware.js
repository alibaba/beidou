
const webpackMiddleware = require('./webpack-middleware');
const helper = require('../utils');

module.exports = function (compiler, options, app) {
  const webpackConfig = helper.getWebpackConfig(options, app);
  // middleware generator
  return webpackMiddleware(compiler, {
    noInfo: options.noInfo,
    quiet: options.quiet,
    lazy: options.lazy,
    watchOptions: options.watchOptions,
    publicPath: options.publicPath || webpackConfig.output.publicPath,
    headers: options.headers,
    stats: options.stats,
  }, {
    waitUntilValid() {
      app.emit('webpack-server-ready');
      app.logger.info('[beidou:plugin:webpack] webpack-server-ready');
    },
  });
};
