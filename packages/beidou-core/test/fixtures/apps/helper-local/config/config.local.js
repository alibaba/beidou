'use strict';

const path = require('path');

exports.logger = {
  consoleLevel: 'NONE',
};

exports.webpack = {
  custom: {
    configPath: path.resolve(__dirname, '../webpack/webpack.config.dev.js'),
  },
};
