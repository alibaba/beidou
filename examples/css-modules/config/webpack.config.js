'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (app, defaultConfig, dev) => {
  const module = {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            presets: [require.resolve('babel-preset-beidou-client')],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                modules: true,
                sourceMap: dev,
              },
            },
            {
              loader: require.resolve('sass-loader'),
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: require.resolve('url-loader'),
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
