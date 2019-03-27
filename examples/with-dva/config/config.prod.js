'use strict';

const path = require('path');

module.exports = {
  keys: 'secret',
  static: {
    prefix: '/build',
    dir: path.join(__dirname, '../build'),
  },
};
