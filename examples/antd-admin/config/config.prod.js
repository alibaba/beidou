'use strict';

const path = require('path');

module.exports = {
  static: {
    prefix: '/build',
    dir: path.join(__dirname, '../build'),
  },
};

