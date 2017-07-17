'use stirct';

const path = require('path');

exports.logger = {
  consoleLevel: 'NONE',
};

exports.webpack = {
  config: path.resolve(__dirname, '../webpack/webpack.config.dev.js'),
};