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
    contentBase: false,
    noInfo: true,
    quiet: false,
    clientLogLevel: 'warning',
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
    },
    headers: { 'X-Custom-Header': 'yes' },
    stats: {
      colors: true,
      chunks: false,
    },
    publicPath: '/build/',
    hot: true,
    proxy: {
      '/foo': {
        target: 'http://127.0.0.1:6001',
        pathRewrite: { '^/foo': '' },
        changeOrigin: true,
        secure: false
      }
    }
  },
};
