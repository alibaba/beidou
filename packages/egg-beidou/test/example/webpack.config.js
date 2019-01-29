'use strict';
const path = require('path');
const webpack = require('webpack');
module.exports = Object.assign({}, {
  entry: {
    "redux/page": path.join(__dirname, './redux/page.jsx'),
    "spa/index": path.join(__dirname, './spa/index.jsx'),
    "simple/index": path.join(__dirname, './simple/index.jsx'),
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  mode: 'development',
  target: 'node',
  resolve: {
    extensions: [ '.js', '.mjs', '.jsx', '.json' ],
  },
  externals: /^react(-dom)?/i,
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      fetch: 'isomorphic-fetch',
      promise: 'promise',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url-loader?limit=100',
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
        }],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'entry',
                  targets: {
                    node: true,
                  },
                },
              ],
              '@babel/react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ],
          },

        }],
      },
    ],
  },
});
