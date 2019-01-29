'use strict';

const env = require('@babel/preset-env');
const react = require('@babel/preset-react');
const typescript = require('@babel/preset-typescript');

module.exports = function (api, opt) {
  api.assertVersion(7);
  const presets = [
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
  ];

  if (opt.typescript) {
    if (typeof opt.typescript === 'object') {
      presets.push([typescript, opt.typescript]);
    } else {
      presets.push(typescript);
    }
  }

  presets.push(react);

  return {
    presets,
    plugins: [
      // stage 2
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        {
          loose: true,
        },
      ],
      require.resolve('babel-plugin-add-module-exports'),
    ],
  };
};
