'use strict';

const webpack = require('webpack');
const RaxWebpackPlugin = require('rax-webpack-plugin');

module.exports = (app, defaultConfig, dev) => {
  const { universal } = app.config.isomorphic;
  const module = {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            presets: [
              [
                require.resolve('@babel/preset-env'),
                {
                  targets: {
                    browsers: ['>1%', 'last 4 versions', 'not ie < 9'],
                  },
                  useBuiltIns: false,
                  modules: false,
                  // debug: true,
                },
              ],
              [
                require.resolve('babel-preset-rax'),
                {
                  development: false,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: require.resolve('stylesheet-loader'),
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        dev ? 'development' : 'production'
      ),
      __CLIENT__: true,
      __DEV__: dev,
      __SERVER__: false,
    }),
    new RaxWebpackPlugin({
      target: 'umd',
      frameworkComment: '// {"framework" : "Rax"}',
      // component mode build config
      moduleName: 'rax',
      globalName: 'Rax',
      // externalBuiltinModules: false,
      platforms: ['web'],
    }),
  ];

  if (universal) {
    plugins.push(new app.IsomorphicPlugin(universal));
  }

  if (dev) {
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  const optimization = {
    namedModules: true,
    splitChunks: {
      name: 'manifest',
      chunks: 'all',
    },
    noEmitOnErrors: true,
    concatenateModules: true,
  };

  return {
    ...defaultConfig,
    target: 'web',
    plugins,
    module,
    optimization,
  };
};
