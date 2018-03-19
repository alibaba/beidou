'use strict';

const path = require('path');
const env = require('babel-preset-env');
const stage2 = require('babel-preset-stage-2');
const react = require('babel-preset-react');
const typeCheck = require('babel-plugin-typecheck');
const reactHotLoader = require('react-hot-loader');

let browsers;
const defaultList = ['>1%', 'last 4 versions', 'not ie < 9'];
try {
  const pkg = require(path.join(process.cwd(), 'package.json'));
  browsers = pkg.browserslist || defaultList;
} catch (e) {
  browsers = defaultList;
}

module.exports = {
  presets: [
    [
      env,
      {
        useBuiltIns: true,
        modules: false,
        targets: {
          browsers,
        },
      },
    ],
    stage2,
    react,
  ],
  env: {
    development: {
      plugins: [typeCheck, reactHotLoader],
    },
  },
};
