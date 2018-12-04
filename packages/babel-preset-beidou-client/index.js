'use strict';

const path = require('path');
const env = require('@babel/preset-env');
const react = require('@babel/preset-react');
const codependency = require('codependency');

const requirePeer = codependency.register(module, { strictCheck: false });

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

  const preset = {
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
      require.resolve('babel-plugin-add-module-exports'),
    ],
  };

  // make sure react-hot-loader only enable in development
  // and dependency installed in project
  if (!api.env('production') &&
    requirePeer('react-hot-loader/babel', { optional: true })) {
    preset.plugins.push(require.resolve('react-hot-loader/babel'));
  }
  return preset;
};
