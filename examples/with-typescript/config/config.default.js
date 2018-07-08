'use strict';

const path = require('path');

module.exports = {
  keys: 'secret',
  view: {
    defaultExtension: '.tsx',
  },
  router: {
    exts: ['.jsx', '.ts', '.tsx'],
  },
  isomorphic: {
    babel: false,
  },
  webpack: {
    // your webpack config file
    custom: {
      configPath: path.resolve(__dirname, './webpack.config.js'),
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
        client: path.join(__dirname, '../client'),
      },
    },
  },
};
