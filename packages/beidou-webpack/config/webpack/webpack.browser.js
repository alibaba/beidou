'use strict';

// Webpack config for browser

process.traceDeprecation = true;

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');
const {
  imageLoaderConfig,
  fileLoaderConfig,
  getStyleCongfigs,
  ExtractTextPlugin,
} = require('./utils');

module.exports = (app, entry, dev) => {
  const factory = app.webpackFactory;
  common(app, entry, dev);
  [
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
  ].forEach(v => factory.defineRule(v).addRule(v));

  // config.plugins.push(new ExtractTextPlugin('[name].css'));

  // if (!dev) {
  //   config.mode = 'production';
  //   config.plugins.push(
  //     new webpack.DefinePlugin({
  //       'process.env.NODE_ENV': JSON.stringify('production'),
  //       'process.env.BABEL_ENV': JSON.stringify('production'),
  //       __CLIENT__: true,
  //       __DEV__: false,
  //       __SERVER__: false,
  //     })
  //   );
  //   config.optimization.minimizer = [
  //     new UglifyJsPlugin({
  //       parallel: true,
  //       extractComments: true,
  //       uglifyOptions: {
  //         warnings: false,
  //       },
  //     }),
  //   ];
  //     }),
  //     new webpack.HotModuleReplacementPlugin()
  //   );
  // }
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
          extractComments: true,
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
  return factory.getConfig();
};
