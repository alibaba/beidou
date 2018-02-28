'use strict';

const path = require('path');

module.exports = function (antx) {
  const exports = {
    isomorphic: {
      match: '/render-polyfill',
    },
  };
  return exports;
};
