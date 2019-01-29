'use strict';

const path = require('path');

module.exports = {
  entry: {
    index: path.join(__dirname, './index.jsx'),
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
};

