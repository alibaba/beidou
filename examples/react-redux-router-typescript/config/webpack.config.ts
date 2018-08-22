'use strict';
import * as path from 'path';
import webpack from 'webpack';

export default (app, defaultConfig, dev) => {
  if (app && dev) {
    defaultConfig.plugins.push(
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify('daily'),
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true,
        __DAILY__: true,
      }),
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
      }),
    );
  }

  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['>1%', 'last 4 versions', 'not ie < 9'],
                },
                useBuiltIns: 'entry',
                // Do not transform modules to CJS
                modules: false,
              },
            ],
            '@babel/typescript',
            ['@babel/preset-stage-2', { decoratorsLegacy: true }],
            [
              '@babel/preset-react',
              {
                development: dev,
                useBuiltIns: true,
              },
            ],
          ],

          plugins: [
            [
              '@babel/transform-runtime',
              {
                polyfill: false,
                regenerator: true,
              },
            ],
          ],
          env: {
            development: {
              plugins: ['module:react-hot-loader/babel'],
            },
          },
          cacheDirectory: dev,
          compact: !dev,
          highlightCode: true,
        },
      },
    ],
  };

  defaultConfig.module.rules[0].use = {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['>1%', 'last 4 versions', 'not ie < 9'],
            },
            useBuiltIns: 'entry',
            // Do not transform modules to CJS
            modules: false,
          },
        ],
        '@babel/preset-stage-2',
        [
          '@babel/preset-react',
          {
            development: dev,
            useBuiltIns: true,
          },
        ],
      ],
      plugins: [],
      env: {
        development: {
          plugins: ['module:react-hot-loader/babel'],
        },
      },
      cacheDirectory: dev,
      compact: !dev,
      highlightCode: true,
    },
  };

  defaultConfig.module.rules.push(tsLoader);
  defaultConfig.output = {
    path: path.join(__dirname, '../app/public'),
    filename: '[name].js',
    publicPath: '/public/',
    chunkFilename: '[name].[chunkhash].js',
  };
  return defaultConfig;
};
