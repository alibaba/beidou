'use strict';

// Webpack config for web

const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = (app) => {
  const config = merge(common(app), {
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        filename: 'manifest.js',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [require.resolve('babel-preset-beidou-client')],
            },
          },
        },
      ],
    },
  });

  const envConfig = (() => {
    if (app.config.env !== 'prod') {
      return {
        devServer: {
          hot: true,
        },
        plugins: [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __CLIENT__: true,
            __DEV__: true,
            __SERVER__: false,
          }),
          new webpack.NamedModulesPlugin(),
          new webpack.HotModuleReplacementPlugin(),
        ],
      };
    }
    return {
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
          __CLIENT__: true,
          __DEV__: false,
          __SERVER__: false,
        }),
      ],
    };
  })();

  return merge(config, envConfig);
};
