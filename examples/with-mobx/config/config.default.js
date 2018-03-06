'use strict';

const path = require('path');

module.exports = {
  keys: 'secret',
  router: {
    entry: 'view',
  },
  isomorphic: {
    babel: {
      plugins: [require.resolve('babel-plugin-transform-decorators-legacy')],
    },
  },
  webpack: {
    config: path.join(__dirname, './webpack.config.js'),
  },
};
