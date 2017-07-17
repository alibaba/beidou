
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (app) => {
  const eggLoader = app.loader;
  const dev = app.config.env !== 'prod';

  const outputPath = path.join(app.config.baseDir, app.config.webpack.outputPath);
  const entry = eggLoader.loadFile(path.join(__dirname, '../lib/entry-loader.js'));

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.js'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
      __CLIENT__: true
    }),
    new webpack.ProgressPlugin((percentage, msg) => {
      const stream = process.stderr;
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0);
        stream.write(`📦   ${msg}`);
        stream.clearLine(1);
      }
    }),
    new ExtractTextPlugin('[name].css'),
  ];

  if (dev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
  }

  const config = {
    devtool: dev ? 'eval' : false,
    context: app.config.baseDir,
    entry,
    output: {
      path: outputPath,
      filename: '[name].js?[hash]',
      chunkFilename: '[name].js',
      publicPath: app.config.webpack.publicPath
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
              presets: ['beidou-client']
            }
          },
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader'
            }, {
              loader: 'sass-loader'
            }],
            fallback: 'style-loader',
          }),
        }
      ]
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx']
    },
    devServer: {
      hot: true,
    },
    plugins,
  };

  return config;
};
