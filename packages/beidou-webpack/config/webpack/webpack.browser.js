'use strict';

// Webpack config for browser

process.traceDeprecation = true;

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { common } = require('./webpack.common');
const ManifestPlugin = require('webpack-manifest-plugin');
const {
  imageLoaderConfig,
  fileLoaderConfig,
  getStyleCongfigs,
  MiniCssExtractPlugin,
} = require('./utils');

module.exports = (app, entry, dev) => {
  const { pkg } = app.config;
  const factory = app.webpackFactory;
  const typescript = pkg && pkg.config && pkg.config.typescript;
  const viewConfig = app.config.view;
  const { custom } = app.config.webpack;
  common(app, entry, dev);

  [
    {
      test: /\.(js|jsx|ts|tsx|mjs)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: true,
          presets: [
            [require.resolve('babel-preset-beidou-client'), { typescript }],
          ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: dev,
          compact: !dev,
          highlightCode: true,
        },
      },
    },
    ...getStyleCongfigs(dev, {
      cssExtract: custom.cssExtract,
    }),
    imageLoaderConfig,
    fileLoaderConfig,
  ].forEach(v => factory.defineRule(v).addRule(v));

  factory
    .definePlugin(
      MiniCssExtractPlugin,
      {
        filename: '[name].css',
      },
      'MiniCssExtractPlugin'
    )
    .definePlugin(
      webpack.DefinePlugin,
      {
        'process.env.NODE_ENV': JSON.stringify('production'),
        __CLIENT__: true,
        __DEV__: false,
        __SERVER__: false,
      },
      'DefinePlugin'
    );

  if (!dev) {
    factory.set('mode', 'production');
    factory.addPlugin('DefinePlugin');
    factory.set('optimization', {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: false,
        }),
      ],
    });
  } else {
    factory.set('mode', 'development');
    factory.get('devServer').hot = true;
    factory.setPlugin(
      webpack.DefinePlugin,
      {
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.BABEL_ENV': JSON.stringify('development'),
        __CLIENT__: true,
        __DEV__: true,
        __SERVER__: false,
      },
      'DefinePlugin'
    );

    factory.setPlugin(
      webpack.HotModuleReplacementPlugin,
      null,
      'HotModuleReplacementPlugin'
    );
  }
  if (custom.cssExtract) {
    factory.addPlugin('MiniCssExtractPlugin');
  }

  if (viewConfig && viewConfig.useHashAsset && !dev) {
    factory.addPlugin(
      ManifestPlugin,
      { fileName: viewConfig.hashAssetPath, publicPath: '' },
      'WebpackManifestPlugin'
    );
    factory.setPlugin(
      MiniCssExtractPlugin,
      {
        filename: '[name]_[chunkhash:8].css',
      },
      'MiniCssExtractPlugin'
    );
  }

  return factory.getConfig();
};
