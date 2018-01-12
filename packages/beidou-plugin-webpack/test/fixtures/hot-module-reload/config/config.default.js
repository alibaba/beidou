'use strict';


module.exports = function () {
  const exports = {};

  exports.webpack = {
    devServer: {
      hot: true,
    }
  };

  exports.keys = 'test';
  return exports;
};
