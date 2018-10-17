'use strict';

const path = require('path');
const env = require('@babel/preset-env');
const react = require('@babel/preset-react');
const reactHotLoader = require('react-hot-loader/babel');

let browsers;
const defaultList = ['>1%', 'last 4 versions', 'not ie < 9'];
try {
  const pkg = require(path.join(process.cwd(), 'package.json'));
  browsers = pkg.browserslist || defaultList;
} catch (e) {
  browsers = defaultList;
}

module.exports = function (api) {
  api.assertVersion(7);

  return {
    presets: [
      [
        env,
        {
          useBuiltIns: 'entry',
          targets: {
            browsers,
          },
        },
      ],
      react,
    ],
    plugins: [
      // stage 2
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-proposal-function-sent'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-numeric-separator'),
      require.resolve('@babel/plugin-proposal-throw-expressions'),

    ],

    env: {
      development: {
        plugins: [reactHotLoader],
      },
    },
  };
};
