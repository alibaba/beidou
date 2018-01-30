'use strict';

// Webpack config for web

const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = app => merge(common(app), {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.js',
    }),
  ],
});
