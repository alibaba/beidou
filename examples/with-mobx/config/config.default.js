'use strict';

const path = require('path');

module.exports = {
  keys: 'secret',
  router: {
    entry: 'view',
  },
  isomorphic: {
    universal: {
      assets: ['.css'],
    },
    babel: {
      plugins: [require.resolve('babel-plugin-transform-decorators-legacy')],
    },
  },
  react: {
    assetPath: '/build',
  },
  webpack: {
    config: path.join(__dirname, './webpack.config.js'),
    output: {
      publicPath: '/build/',
    },
    // devServer: {
    //   noInfo: false,
    //   quiet: false,
    //   clientLogLevel: 'info',
    // },
  },
};
