'use strict';

const path = require('path');

module.exports = function () {
  const exports = {
    keys: 'test',
    isomorphic: {
      universal: {
        assets: [
          '.scss',
          {
            ext: '.less',
          },
        ],
        cache: false,
      },
    },
  };
  return exports;
};
