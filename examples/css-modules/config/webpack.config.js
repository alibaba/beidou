'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (app, defaultConfig /* , dev */) => {
  const module = {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['beidou-client'],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          }, {
            loader: 'sass-loader',
          }],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 81920,
            },
          },
        ],
      },
    ],
  };

  return {
    ...defaultConfig,
    module,
  };
};
