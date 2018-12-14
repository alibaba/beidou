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
  common(app, entry, dev);
  [
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
  ].forEach((v) => {
    app.webpackFactory.defineRule(v).addRule(v);
  });

  app.webpackFactory
    .definePlugin(ExtractTextPlugin, '[name].css', 'ExtractTextPlugin')
    .addPlugin('ExtractTextPlugin')
    .definePlugin(webpack.optimize.CommonsChunkPlugin, {
      name: 'manifest',
      filename: 'manifest.js',
    }, 'CommonsChunkPlugin')
    .addPlugin('CommonsChunkPlugin');
  app.webpackFactory.definePlugin(
    webpack.optimize.UglifyJsPlugin, {
      compress: {
        warnings: false,
      },
    }, 'UglifyJsPlugin');

  app.webpackFactory.definePlugin(
    webpack.DefinePlugin, {
      'process.env.NODE_ENV': JSON.stringify('production'),
      __CLIENT__: true,
      __DEV__: false,
      __SERVER__: false,
    }, 'DefinePlugin');

  if (!dev) {
    app.webpackFactory.addPlugin('UglifyJsPlugin');
    app.webpackFactory.addPlugin('DefinePlugin');
  } else {
    app.webpackFactory.getConfig().devServer.hot = true;
    app.webpackFactory.setPlugin(
      webpack.DefinePlugin, {
        'process.env.NODE_ENV': JSON.stringify('development'),
        __CLIENT__: true,
        __DEV__: true,
        __SERVER__: false,
      }, 'DefinePlugin');

    app.webpackFactory.setPlugin(webpack.NamedModulesPlugin, null, 'NamedModulesPlugin');
    app.webpackFactory.setPlugin(webpack.HotModuleReplacementPlugin, null, 'HotModuleReplacementPlugin');
  }
  return app.webpackFactory.getConfig();
};
