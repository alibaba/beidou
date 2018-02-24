'use strict';

const path = require('path');

module.exports = {
  react: {
    static: true,
    cache: false,
    beautify: true,
    assetPath: '/build',
  },
  webpack: {
    config: path.resolve(__dirname, './webpack.config.js'),
    output: {
      publicPath: '/build',
    },
  },
};
