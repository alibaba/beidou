const path = require('path');

module.exports = function (antx) {
  const exports = {};

  exports.webpack = {
    config: path.resolve(__dirname, '../webpack/webpack.config.js'),
    publicPath: '/static'
  };

  exports.keys = '_2323234_3432_8857';

  return exports;
};
