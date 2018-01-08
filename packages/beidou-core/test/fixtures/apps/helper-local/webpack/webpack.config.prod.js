'use strict';

// Webpack config for production
const extend = require('extend');
const webpack = require('webpack');
const config = require('./webpack.config.base.js');

const prodConfig = extend(true, {}, config, {
  plugins: config.plugins.concat([
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    })
  ])
});

module.exports = prodConfig;
