'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (app, defaultConfig, entry, isDev) => {
  const outputPath = path.join(app.config.baseDir, 'build');
  const factory = app.webpackFactory;

  factory.cssExtract = false;

  factory.reset({
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: factory.getConfig().entry,
    output: {
      path: outputPath,
      filename: '[name].js?[hash]',
      chunkFilename: '[name].js',
      publicPath: '/build/',
    },
    module: {
      "strictExportPresence": true,
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx'],
      alias: {
        "client": "../client"
      },
    },
    devServer: {
      publicPath: '/build',
    }
  });

  return factory.getConfig();


};
