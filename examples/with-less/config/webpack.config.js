'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (app, defaultConfig /* , dev */) => {
  defaultConfig.module.rules.push({
    test: /\.less$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: '[local]_[hash:base64]',
          },
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            javascriptEnabled: true,
          },
        },
      ],
      fallback: require.resolve('style-loader'),
    }),
  });

  return {
    ...defaultConfig,
  };
};
