'use strict';

const path = require('path');

module.exports = function () {
  const exports = {
    logger: {
      dir: path.join(__dirname, '../logs')
    },
    keys: 'test',
  };
  return exports;
};
