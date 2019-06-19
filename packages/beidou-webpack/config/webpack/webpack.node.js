'use strict';

// Webpack config for node

const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { common } = require('./webpack.common');
const {
  imageLoaderConfig,
  fileLoaderConfig,
  getStyleCongfigs,
  MiniCssExtractPlugin,
} = require('./utils');

module.exports = (app, entry, dev) => {
  const factory = app.webpackFactory;
  const viewConfig = app.config.view;
  const { custom } = app.config.webpack;
  common(app, entry, dev);
  factory.get('output').libraryTarget = 'commonjs';
  factory.set('target', 'node');
  factory.set('externals', /^react(-dom)?$/);
  factory.set('node', {
    __filename: true,
    __dirname: true,
  });

  [
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
    ...getStyleCongfigs(dev, {
      cssExtract: custom.cssExtract,
    }),
    imageLoaderConfig,
    fileLoaderConfig,
  ].forEach((v) => {
    factory.defineRule(v).addRule(v);
  });

  if (!dev && viewConfig.useHashAsset) {
    factory.definePlugin(
      MiniCssExtractPlugin,
      {
        filename: '[name]_[hash:8].css',
      },
      'MiniCssExtractPlugin'
    );
  } else {
    factory.definePlugin(
      MiniCssExtractPlugin,
      {
        filename: '[name].css',
      },
      'MiniCssExtractPlugin'
    );
  }

  if (custom.cssExtract) {
    factory.addPlugin('MiniCssExtractPlugin');
  }

  factory.definePlugin(
    webpack.DefinePlugin,
    {
      'process.env.NODE_ENV': JSON.stringify('production'),
      __CLIENT__: false,
      __DEV__: false,
      __SERVER__: true,
    },
    'DefinePlugin'
  );

  if (!dev) {
    factory.addPlugin('DefinePlugin');
    factory.addPlugin(MinifyPlugin, null, 'MinifyPlugin');
  } else {
    factory.setPlugin(
      webpack.DefinePlugin,
      {
        'process.env.NODE_ENV': JSON.stringify('development'),
        __CLIENT__: false,
        __DEV__: true,
        __SERVER__: true,
      },
      'DefinePlugin'
    );
  }
  return factory.getConfig();
};
