'use strict';

// Webpack config for node

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = (app, entry, dev) => {
  const config = merge(common(app, entry, dev), {
    output: {
      libraryTarget: 'commonjs',
    },
    target: 'node',
    externals: /^react(-dom)?$/,
    node: {
      __filename: true,
      __dirname: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [require.resolve('babel-preset-beidou-server')],
            },
          },
        },
      ],
    },
    plugins: [
      new MinifyPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        __CLIENT__: true,
        __DEV__: true,
        __SERVER__: false,
      }),
    ],
  });

  const envConfig = (() => {
    if (app.config.env !== 'prod') {
      return {
        plugins: [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __CLIENT__: false,
            __DEV__: true,
            __SERVER__: true,
          }),
        ],
      };
    }
    return {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
          __CLIENT__: false,
          __DEV__: false,
          __SERVER__: true,
        }),
      ],
    };
  })();

  return merge(config, envConfig);
};
