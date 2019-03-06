'use strict';

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (app, defaultConfig) => {
  defaultConfig.plugins.push(
    new CopyPlugin([
      {
        from: path.join(app.baseDir, 'node_modules/nprogress/nprogress.js'),
        to: path.join(app.baseDir, 'build/nprogress.js'),
      },
    ])
  );

  return {
    ...defaultConfig,
    entry: {
      login: [path.join(__dirname, '../client/pages/login/index.jsx')],
      main: [path.join(__dirname, '../client/pages/dashboard/index.jsx')],
    },
    // externals: {
    //   react: 'React',
    //   'react-dom': 'ReactDOM',
    //   antd: true,
    // },
    resolve: {
      extensions: ['.json', '.js', '.jsx'],
      alias: {
        client: path.join(__dirname, '../client'),
        themes: path.join(__dirname, '../client/themes'),
      },
    },
  };
};
