'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (app, defaultConfig, isDev) => {
  const universal = app.config.isomorphic.universal;
  const dev = app.config.env !== 'prod';
  const outputPath = path.join(app.config.baseDir, 'output');

  const plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        dev ? 'development' : 'production'
      ),
      __CLIENT__: true,
    }),
    new webpack.ProgressPlugin((percentage, msg) => {
      const stream = process.stderr;
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0);
        stream.write(`📦   ${msg}`);
        stream.clearLine(1);
      }
    }),
    new app.IsomorphicPlugin(universal),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ];

  let mode = 'development';
  if (dev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    mode = 'production';
  }

  const config = {
    mode,
    devtool: dev ? 'eval' : false,
    context: app.baseDir,
    entry: defaultConfig.entry,
    output: {
      path: outputPath,
      filename: '[name].js?[hash]',
      chunkFilename: '[name].js',
      publicPath: app.config.webpack.publicPath,
    },
    module: {
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
          use:[
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              // uncomment if need css modules
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[local]_[hash:base64:5]',
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 81920,
                esModule: false,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx'],
    },
    devServer: {
      hot: true,
    },
    plugins,
  };

  return config;
};
