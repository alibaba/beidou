'use strict'; // eslint-disable-line

/**
 * webpack public config
 */
// const path = require('path');
const webpack = require('webpack');
const globby = require('globby');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const babelrc = require('./webpack-babelrc.js');

const cwd = process.cwd();
const outputPath = `${cwd}/build`;
const files = globby.sync(['**/pages/*'], { cwd: `${cwd}/client` });
const entry = {};

files.forEach((item) => {
  entry[`${item}/index`] = [`${cwd}/client/${item}/index.jsx`];
});
module.exports = {
  devtool: 'source-map',
  // context: path.resolve(__dirname, '..'),
  entry,
  output: {
    path: outputPath,
    filename: '[name].js?[hash]',
    chunkFilename: '[name].js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/i,
        loaders: ['react-hot-loader/webpack', `babel?${babelrc}`],
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        // exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&sourceMap&localIdentName=[local]_[hash:base64:5]!less-loader'),
      },
      {
        test: /\.scss$/,
        // exclude: /node_modules/,
        // loader: ExtractTextPlugin.extract('isomorphic-style-loader', 'css-loader', 'postcss-loader'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }
    ],
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'lib',
      'node_modules',
    ],
    extensions: ['', '.json', '.js', '.jsx'],
  },
  plugins: [
    // Hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new ExtractTextPlugin('[name].css?[hash]-[chunkhash]-[contenthash]-[name]'),
    // progress
    new webpack.ProgressPlugin((percentage, msg) => {
      const stream = process.stderr;
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0);
        stream.write(`📦   ${msg}`);
        stream.clearLine(1);
      }
    })
  ]
};
