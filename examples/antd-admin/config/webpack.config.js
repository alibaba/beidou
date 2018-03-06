'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (app, defaultConfig /* , dev */) => {
  defaultConfig.module.rules.push({
    test: /\.less$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: '[local]_[hash:base64:5]',
          },
        },
        {
          loader: require.resolve('less-loader'),
        },
      ],
      fallback: require.resolve('style-loader'),
    }),
  });

  defaultConfig.plugins.push(new ExtractTextPlugin('[name].css'));

  return {
    ...defaultConfig,
    entry: {
      login: [path.join(__dirname, '../client/pages/login/index.jsx')],
      main: [path.join(__dirname, '../client/pages/dashboard/index.jsx')],
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: true,
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx'],
      alias: {
        client: path.join(__dirname, '../client'),
        themes: path.join(__dirname, '../client/themes'),
      },
    },
  };
};
