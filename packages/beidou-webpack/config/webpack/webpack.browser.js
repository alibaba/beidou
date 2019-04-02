'use strict';

// Webpack config for browser

process.traceDeprecation = true;

const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { common } = require('./webpack.common');
const ManifestPlugin = require('webpack-manifest-plugin');
const {
  imageLoaderConfig,
  fileLoaderConfig,
  getStyleCongfigs,
  ExtractTextPlugin,
} = require('./utils');

module.exports = (app, entry, dev) => {
  const { pkg } = app.config;
  const factory = app.webpackFactory;
  const typescript = pkg && pkg.config && pkg.config.typescript;
  const viewConfig = app.config.view;
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
    ...getStyleCongfigs(dev),
    imageLoaderConfig,
    fileLoaderConfig,
  ].forEach(v => factory.defineRule(v).addRule(v));

  factory
    .definePlugin(ExtractTextPlugin, '[name].css', 'ExtractTextPlugin')
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

  factory.addPlugin('ExtractTextPlugin');

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
  if (viewConfig.useHashAsset && !dev) {
    const hashAssetPath =
      viewConfig.hashAssetPath || path.join(app.baseDir, 'manifest.json');
    factory.addPlugin(
      ManifestPlugin,
      { fileName: hashAssetPath },
      'WebpackManifestPlugin'
    );
    factory.setPlugin(
      ExtractTextPlugin,
      '[name]_[md5:contenthash:hex:8].css',
      'ExtractTextPlugin'
    );
  }
  return factory.getConfig();
};
