'use strict';

/**
 * default config
 */

exports.webpack = {
  // config: 'path/to/webpack/config/file',
  output: {
    path: './build',
    filename: '[name].js?[hash]',
    chunkFilename: '[name].js',
    publicPath: './build',
  },

  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },

  devServer: {
    contentBase: false,
    port: 6002,
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
    publicPath: '/build',
    hot: true,
  },
};
