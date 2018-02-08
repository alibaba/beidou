'use strict';

const path = require('path');

module.exports = function () {
  const exports = {
    keys: 'test',
    isomorphic: {
      universal: {
        assets: ['.scss', '.less'],
      }
    }
  };
  return exports;
};
