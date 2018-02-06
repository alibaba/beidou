'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const RaxWebpackPlugin = require('rax-webpack-plugin');

module.exports = (app) => {
  const universal = app.config.isomorphic.universal;
  const dev = app.config.env !== 'prod';
  const outputPath = path.join(
    app.config.baseDir,
    app.config.webpack.outputPath
  );

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.js',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        dev ? 'development' : 'production'
      ),
      __CLIENT__: true,
      __DEV__: dev,
      __SERVER__: false,
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.NoEmitOnErrorsPlugin(),
    new RaxWebpackPlugin({
      target: 'umd',
      // externalBuiltinModules: false,
      platforms: ['web'],
    }),
  ];

  if (universal) {
    plugins.push(new app.IsomorphicPlugin(universal));
  }

  if (dev) {
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      })
    );
  }

  const config = {
    target: 'web',
    devtool: dev ? 'eval' : false,
    context: app.config.baseDir,
    entry: app.webpackEntry,
    output: {
      path: outputPath,
      filename: '[name].js?[hash]',
      chunkFilename: '[name].js',
      publicPath: app.config.webpack.publicPath,
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
              presets: [require.resolve('babel-preset-rax')],
            },
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: require.resolve('stylesheet-loader'),
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 81920,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx'],
    },
    devServer: {
      hot: true,
    },
    plugins,
  };

  return config;
};
