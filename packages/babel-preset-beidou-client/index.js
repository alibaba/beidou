'use strict';

const env = require('babel-preset-env');
const stage2 = require('babel-preset-stage-2');
const react = require('babel-preset-react');
const transformRuntime = require('babel-plugin-transform-runtime');
const typeCheck = require('babel-plugin-typecheck');
const reactHotLoader = require('react-hot-loader');

module.exports = {
  presets: [
    [
      env,
      {
        targets: {
          browsers: ['>1%', 'last 4 versions', 'not ie < 9'],
        },
      },
    ],
    stage2,
    react,
  ],
  plugins: [transformRuntime],
  env: {
    development: {
      plugins: [typeCheck, reactHotLoader],
    },
  },
};
