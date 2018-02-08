'use strict';

const path = require('path');

module.exports = function () {
  const exports = {
    logger: {
      dir: path.join(__dirname, '../logs')
    },
    keys: '',
    isomorphic: {
      match: '/render-polyfill'
    },
    view: {
      defaultViewEngine: 'react',
      defaultExtension: '.jsx',
      root: path.join(__dirname, '../app/views'),
    },
  };
  return exports;
};
