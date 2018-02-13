'use strict';

// Webpack common config

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (app, entry, dev) => {
  const { universal } = app.config.isomorphic;
  const webpackConfig = app.config.webpack;

  const { output, resolve, devServer } = webpackConfig;

  if (!path.isAbsolute(output.path)) {
    output.path = path.join(app.baseDir, output.path);
  }

  const module = {
    rules: [
      {
        test: /\.css$/,
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
          ],
        }),
      },
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
  };

  const plugins = [
    new ExtractTextPlugin('[name].css'),
    new webpack.NoEmitOnErrorsPlugin(),
  ];

  if (universal) {
    plugins.push(new app.IsomorphicPlugin(universal));
  }

  return {
    devtool: dev ? 'eval' : false,
    context: app.config.baseDir,
    entry,
    output,
    module,
    resolve,
    plugins,
    devServer,
  };
};
