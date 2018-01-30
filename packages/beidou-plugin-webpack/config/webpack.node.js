'use strict';

// Webpack config for node

const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = app => merge(common(app), {
  output: {
    libraryTarget: 'commonjs',
  },
  target: 'node',
  externals: /^react(-dom)?$/,
});
