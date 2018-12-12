'use strict';

// Webpack config for browser

process.traceDeprecation = true;

const webpack = require('webpack');
const common = require('./webpack.common');
const {
  imageLoaderConfig,
  fileLoaderConfig,
  getStyleCongfigs,
  ExtractTextPlugin,
} = require('./utils');

module.exports = (app, entry, dev) => {
  const config = common(app, entry, dev);
  app.webpackFactory.reset(config);
  app.webpackFactory.addRules([
    {
      test: /\.(js|jsx|mjs)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: [require.resolve('babel-preset-beidou-client')],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: dev,
          compact: !dev,
          highlightCode: true,
        },
      },
    },
    ...getStyleCongfigs(dev),
    imageLoaderConfig,
    fileLoaderConfig,
  ]);

  app.webpackFactory
    .addPlugin(ExtractTextPlugin, '[name].css', 'ExtractTextPlugin')
    .addPlugin(webpack.optimize.CommonsChunkPlugin, {
      name: 'manifest',
      filename: 'manifest.js',
    }, 'CommonsChunkPlugin');

  if (!dev) {
    app.webpackFactory.addPlugin(
      webpack.optimize.UglifyJsPlugin, {
        compress: {
          warnings: false,
        },
      }, 'UglifyJsPlugin');

    app.webpackFactory.addPlugin(
      webpack.DefinePlugin, {
        'process.env.NODE_ENV': JSON.stringify('production'),
        __CLIENT__: true,
        __DEV__: false,
        __SERVER__: false,
      }, 'DefinePlugin');
  } else {
    app.webpackFactory.getConfig().devServer.hot = true;
    app.webpackFactory.addPlugin(
      webpack.DefinePlugin, {
        'process.env.NODE_ENV': JSON.stringify('development'),
        __CLIENT__: true,
        __DEV__: true,
        __SERVER__: false,
      }, 'DefinePlugin');

    app.webpackFactory.addPlugin(webpack.NamedModulesPlugin, null, 'NamedModulesPlugin');
    app.webpackFactory.addPlugin(webpack.HotModuleReplacementPlugin, null, 'HotModuleReplacementPlugin');
  }
  return app.webpackFactory.getConfig();
};
