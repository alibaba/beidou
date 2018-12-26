'use strict';

// Webpack common config

const path = require('path');

const reservedKey = 'custom';

module.exports = (app, entry, dev) => {
  const webpackConfig = app.config.webpack;
  const { output } = webpackConfig;
  if (!path.isAbsolute(output.path)) {
    output.path = path.join(app.baseDir, output.path);
  }

  const module = {
    // makes missing exports an error instead of warning
    strictExportPresence: true,
  };

  app.webpackFactory.definePlugin(app.IsomorphicPlugin);
  const { universal } = app.config.isomorphic;
  if (universal) {
    app.webpackFactory.addPlugin(app.IsomorphicPlugin, universal);
  }

  let finalConfig = {};
  for (const key of Object.keys(webpackConfig)) {
    if (key !== reservedKey) {
      // Skip plugin self configs
      finalConfig[key] = webpackConfig[key];
    }
  }
  finalConfig = {
    ...finalConfig,
    bail: !dev,
    devtool: dev ? 'eval-source-map' : false,
    context: app.config.baseDir,
    entry,
    output,
    module,
  };

  app.webpackFactory.reset(finalConfig);
};
