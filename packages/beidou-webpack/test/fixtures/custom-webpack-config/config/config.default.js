'use strict';

const path = require('path');

module.exports = function (antx) {
  const exports = {};

  exports.webpack = {
    config: path.resolve(__dirname, '../webpack/custom.webpack.config.js'),
  };

  return exports;
};
