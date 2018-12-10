'use strict';

const helper = require('../utils');

module.exports = (app, target = 'browser') => {
  helper.injectPlugin(app);
  const config = app.config.webpack;
  const factory = helper.getWebpackConfig(app, config, target);
  const compiler = factory.webpack();
  return compiler;
};
