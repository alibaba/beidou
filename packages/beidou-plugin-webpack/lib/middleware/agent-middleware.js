'use strict';

const webpackMiddleware = require('./webpack-middleware');
const helper = require('../utils');

module.exports = function (compiler, options, app) {
  const webpackConfig = helper.getWebpackConfig(options, app);
  const {
    noInfo,
    quiet,
    clientLogLevel,
    lazy,
    watchOptions,
    headers,
    stats,
  } = options;
  // middleware generator
  return webpackMiddleware(
    compiler,
    {
      noInfo,
      quiet,
      clientLogLevel,
      lazy,
      watchOptions,
      publicPath: options.publicPath || webpackConfig.output.publicPath,
      headers,
      stats,
    },
    {
      waitUntilValid() {
        app.emit('webpack-server-ready');
        app.logger.info('[beidou:plugin:webpack] webpack-server-ready');
      },
    }
  );
};
