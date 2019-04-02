'use strict';

const path = require('path');

module.exports = appInfo => ({
  webpack: {
    // keep this key name sync with webpack.common.js reservedKey
    custom: {
      depth: 1,
      // configPath: 'path/to/webpack/config/file',
    },
    mode: 'development',
    output: {
      path: './build',
      filename: '[name].js?[hash]',
      chunkFilename: '[name].js',
      publicPath: '/build/',
    },

    resolve: {
      extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
        client: path.join(appInfo.baseDir, 'client'),
      },
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'manifest',
        cacheGroups: {
          default: false,
          vendors: false,
          manifest: {
            test: /[\\/]node_modules[\\/]/,
          },
        },
      },
      noEmitOnErrors: true,
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
      publicPath: '/build/',
      hot: true,
    },
  },
});
