'use strict';

// const webpack = require('webpack');
// const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = (app, defaultConfig) => {
  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
      },
    ],
  };

  defaultConfig.module.rules.push(tsLoader);

  return defaultConfig;
};
