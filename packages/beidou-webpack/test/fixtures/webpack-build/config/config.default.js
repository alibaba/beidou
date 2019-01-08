'use strict';

const path = require('path');

exports.webpack = {
  custom: {
    depth: 2,
  },
  output: {
    path: path.join(__dirname, '../output'),
  },
};
