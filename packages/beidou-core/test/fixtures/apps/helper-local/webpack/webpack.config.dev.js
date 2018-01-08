'use strict';

// Webpack config for development
const webpack = require('webpack');
const extend = require('extend');
const config = require('./webpack.config.base.js');

const devConfig = extend(true, {}, config, {
  devtool: 'source-map',
  plugins: config.plugins.concat([
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify('daily'),
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
      __DAILY___: true
    })
  ])
});

module.exports = devConfig;
