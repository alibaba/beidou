'use strict';

// const webpack = require('webpack');
// const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = (app, defaultConfig) => {
  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'awesome-typescript-loader',
        // options: {
        //   useBabel: true,
        //   babelOptions: {
        //     babelrc: false,
        //     presets: [
        //       ['@babel/preset-env', { targets: 'last 2 versions, ie 11', modules: false }],
        //     ],
        //   },
        //   babelCore: '@babel/core',
        // },
      },
    ],
  };
  defaultConfig.mode = 'development';
  defaultConfig.module.rules.push(tsLoader);
  return defaultConfig;
};
