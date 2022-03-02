'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (app, defaultConfig, entry, isDev) => {
  const universal = app.config.isomorphic.universal;
  const outputPath = path.join(app.config.baseDir, 'build');
  const factory = app.webpackFactory;

  factory.clearPlugin();
  factory.clearRule();

  factory.reset({
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: factory.getConfig().entry,
    output: {
      path: outputPath,
      filename: '[name].js?[hash]',
      chunkFilename: '[name].js',
      publicPath: '/build/',
    },
    module: {
      "strictExportPresence": true,
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx'],
      alias: {
        "client": "../client"
      },
    },
    devServer: {
      publicPath: '/build',
    }
  });


  factory.addPlugin(
    webpack.DefinePlugin, {
      'process.env.NODE_ENV': JSON.stringify(
        isDev ? 'development' : 'production'
      ),
      __CLIENT__: true,
    }, 'DefinePlugin')

  factory
    .addPlugin(new webpack.ProgressPlugin((percentage, msg) => {
      const stream = process.stderr;
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0);
        stream.write(`📦   ${msg}`);
        stream.clearLine(1);
      }
    })) 
    .addPlugin(new app.IsomorphicPlugin(universal))
    .addPlugin(new MiniCssExtractPlugin({
      filename: '[name].css',
    }))

  // 切换环境
  const factoryInDev = factory.env('dev')
  factoryInDev.addPlugin(new webpack.HotModuleReplacementPlugin())

  // 原环境加载
  // factory.addPlugin(new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false,
  //   },
  // }))

  factory.setPlugin(new MiniCssExtractPlugin({
    filename: '[name].modify.css',
  }))

  factory.addRule({
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: ['beidou-client'],
      },
    },
  })

  factory.addRule({
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
          modules: true,
        },
      },
      {
        loader: 'sass-loader',
      },
    
    ]
  });

  return factory.getConfig();;
};
