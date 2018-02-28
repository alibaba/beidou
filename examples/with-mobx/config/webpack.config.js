'use strict';

module.exports = (app, webpackConfig) => {
  for (const loader of webpackConfig.module.rules) {
    if (loader.test.toString() === '/\\.jsx?$/') {
      loader.use.options.plugins = [
        require.resolve('babel-plugin-transform-decorators-legacy'),
      ];
      break;
    }
  }

  return webpackConfig;
};
