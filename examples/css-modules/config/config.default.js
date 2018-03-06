'use strict';

const path = require('path');

module.exports = {
  keys: 'key',
  webpack: {
    config: path.resolve(__dirname, './webpack.config.js'),
  },
};
