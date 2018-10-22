'use strict';

const path = require('path');

const outputPath = path.resolve(__dirname, '../build');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: ['./client/index.js'],
  },
  output: {
    path: outputPath,
    filename: '[name].js?[hash]',
    chunkFilename: '[name].js',
    publicPath: '/static/',
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
    contentBase: false,
    port: 6003,
  },
};
