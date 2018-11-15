'use strict';

const webpack = require('webpack');

module.exports = (app, defaultConfig, dev) => {
  if (app && dev) {
    defaultConfig.plugins.push(
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify('daily'),
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true,
        __DAILY__: true,
      })
    );
  } else {
    defaultConfig.plugins.push(
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify('prod'),
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false,
        __DAILY___: false,
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      })
    );
  }

  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: [require.resolve('babel-preset-beidou-client')],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: dev,
          compact: !dev,
          highlightCode: true,
        },
      },
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
        },
      },
    ],
  };

  defaultConfig.module.rules.push(tsLoader);
  return defaultConfig;
};
