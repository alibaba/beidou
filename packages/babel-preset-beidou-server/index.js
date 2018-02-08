'use strict';

const env = require('babel-preset-env');
const stage2 = require('babel-preset-stage-2');
const react = require('babel-preset-react');

module.exports = {
  presets: [
    [
      env,
      {
        targets: {
          // Compile for this current running node, eg. 8.9.3
          node: 'current',
        },
      },
    ],
    stage2,
    react,
  ],
};
