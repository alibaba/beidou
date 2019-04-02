'use strict';

const path = require('path');

module.exports = {
  webpack: {
    custom: {
      depth: 2,
    },
    output: {
      path: path.join(__dirname, '../output'),
    },
  },
  view: {
    useHashAsset: true,
  }
}