'use strict';

const env = require('@babel/preset-env');
const react = require('@babel/preset-react');

module.exports = function (api) {
  api.assertVersion(7);

  return {
    presets: [
      [
        env,
        {
          targets: {
            // Compile for this current running node, eg. 8.9.3
            node: true,
          },
          useBuiltIns: false,
          // debug: true,
        },
      ],
      react,
    ],
    plugins: [
      // stage 2
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('babel-plugin-add-module-exports'),
    ],
  };
};
