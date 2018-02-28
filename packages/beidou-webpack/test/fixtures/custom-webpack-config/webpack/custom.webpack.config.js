'use strict';

const path = require('path');

const outputPath = path.resolve(__dirname, '../build');

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: ['./client/index.js'],
  },
  output: {
    path: outputPath,
    filename: '[name].js?[hash]',
    chunkFilename: '[name].js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
  devServer: {
    publicPath: '/build',
  },
};
