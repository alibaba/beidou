'use strict';

const path = require('path');

module.exports = {
  keys: 'secret',
  isomorphic: {
    universal: {
      assets: ['.less'],
    },
  },
  webpack: {
    config: path.join(__dirname, './webpack.config.js'),
  },
};
