const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (app, webpackConfig, dev) => {
  const universal = app.config.isomorphic.universal;
  const outputPath = path.join(app.config.baseDir, webpackConfig.output.path);

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.js',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
      __CLIENT__: true,
    }),
    new app.IsomorphicPlugin(universal),
    new ExtractTextPlugin('[name].css'),
  ];

  if (dev) {
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }));
  }

  const config = {
    devtool: dev ? 'eval' : false,
    context: webpack.context,
    entry: webpackConfig.entry,
    output: {
      path: outputPath,
      filename: '[name].js?[hash]',
      chunkFilename: '[name].js',
      publicPath: webpackConfig.publicPath,
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
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              // uncomment if need css modules
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
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx'],
    },
    devServer: webpackConfig.devServer,
    plugins,
  };

  return config;
};
