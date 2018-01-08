'use strict';

const path = require('path');

module.exports = function () {
  const exports = {
    keys: 'test',
    isomorphic: {
      alias: {
        'client': path.join(__dirname, '../client')
      }
    }
  };
  return exports;
};
