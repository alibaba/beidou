'use strict';

// Webpack config for node

const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const common = require('./webpack.common');
const {
  imageLoaderConfig,
  fileLoaderConfig,
  getStyleCongfigs,
  ExtractTextPlugin,
} = require('./utils');

module.exports = (app, entry, dev) => {
  const config = common(app, entry, dev);
  config.output.libraryTarget = 'commonjs';
  config.target = 'node';
  config.externals = /^react(-dom)?$/;
  config.node = {
    __filename: true,
    __dirname: true,
  };
  app.webpackFactory.addRules([
    {
      test: /\.(js|jsx|mjs)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: [require.resolve('babel-preset-beidou-server')],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
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
      webpack.DefinePlugin, {
        'process.env.NODE_ENV': JSON.stringify('production'),
        __CLIENT__: false,
        __DEV__: false,
        __SERVER__: true,
      }, 'DefinePlugin');
    app.webpackFactory.addPlugin(MinifyPlugin, null, 'MinifyPlugin');
  } else {
    app.webpackFactory.addPlugin(webpack.NamedModulesPlugin, null, 'NamedModulesPlugin');
    app.webpackFactory.addPlugin(
      webpack.DefinePlugin, {
        'process.env.NODE_ENV': JSON.stringify('development'),
        __CLIENT__: false,
        __DEV__: true,
        __SERVER__: true,
      }, 'DefinePlugin');
  }
  app.webpackFactory.reset(config);
  return app.webpackFactory.getConfig();
};
