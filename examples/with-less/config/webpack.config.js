'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (app, defaultConfig /* , dev */) => {
  defaultConfig.module.rules.push({
    test: /\.less$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      fallback: require.resolve('style-loader'),
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
    }),
  });

  defaultConfig.plugins.push(new ExtractTextPlugin('[name].css'));

  return {
    ...defaultConfig,
  };
};
