'use strict';

const path = require('path');

module.exports = function () {
  const exports = {};

  exports.webpack = {
    custom: {
      configPath: path.resolve(__dirname, '../webpack/webpack.config.js'),
    },
  };

  exports.keys = '_2323234_3432_8857';

  return exports;
};
