'use strict';

const path = require('path');

module.exports = function () {
  const exports = {};

  exports.webpack = {
    custom: {
      configPath: path.resolve(__dirname, '../webpack/custom.webpack.config.js'),
      cssExtract: false
    },
  };

  return exports;
};
