'use strict';

// Webpack common config

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (app) => {
  const universal = app.config.isomorphic.universal;
  const dev = app.config.env !== 'prod';
  const outputPath = path.join(
    app.config.baseDir,
    app.config.webpack.outputPath
  );

  const plugins = [
    new ExtractTextPlugin('[name].css'),
    new webpack.NoEmitOnErrorsPlugin(),
  ];

  if (universal) {
    plugins.push(new app.IsomorphicPlugin(universal));
  }

  const config = {
    devtool: dev ? 'eval' : false,
    context: app.config.baseDir,
    entry: app.webpackEntry,
    output: {
      path: outputPath,
      filename: '[name].js?[hash]',
      chunkFilename: '[name].js',
      publicPath: app.config.webpack.publicPath,
    },
    module: {
      rules: [
        {
          test: /\.s(c|a)ss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: require.resolve('style-loader'),
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  minimize: !dev,
                  sourceMap: dev,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9',
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
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
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx'],
    },
    plugins,
  };

  return config;
};
