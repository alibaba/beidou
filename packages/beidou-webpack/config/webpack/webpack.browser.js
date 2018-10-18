'use strict';

// Webpack config for browser

process.traceDeprecation = true;

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');
const {
  imageLoaderConfig,
  fileLoaderConfig,
  getStyleCongfigs,
  ExtractTextPlugin,
} = require('./utils');

module.exports = (app, entry, dev) => {
  const config = common(app, entry, dev);
  config.module.rules = [
    {
      test: /\.(js|jsx|mjs)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: true,
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
  ];

  config.plugins.push(
    new ExtractTextPlugin('[name].css'),
  );

  if (!dev) {
    config.mode = 'production';
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        __CLIENT__: true,
        __DEV__: false,
        __SERVER__: false,
      })
    );
    config.optimization.minimizer = [
      new UglifyJsPlugin({
        parallel: true,
        extractComments: true,
        uglifyOptions: {
          warnings: false,
        },
      }),
    ];
  } else {
    config.devServer.hot = true;
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        __CLIENT__: true,
        __DEV__: true,
        __SERVER__: false,
      }),
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return config;
};
