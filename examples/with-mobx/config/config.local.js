'use strict';

const path = require('path');

module.exports = function () {
  const exports = {
    react: {
      static: true,
      cache: false,
      assetPath: '/build',
    },
    webpack: {
      config: path.resolve(__dirname, './webpack.config.js'),
      output: {
        publicPath: '/build/',
      },
    },
  };
  return exports;
};
