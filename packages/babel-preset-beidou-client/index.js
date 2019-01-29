'use strict';

const path = require('path');
const env = require('@babel/preset-env');
const react = require('@babel/preset-react');
const typescript = require('@babel/preset-typescript');
const codependency = require('codependency');

const requirePeer = codependency.register(module, { strictCheck: false });

let browsers;
const defaultList = ['>1%', 'last 4 versions', 'not ie < 9'];
try {
  const pkg = require(path.join(process.cwd(), 'package.json'));
  browsers = pkg.browserslist || defaultList;
} catch (e) {
  /* istanbul ignore next */
  browsers = defaultList;
}

module.exports = function (api, opt) {
  api.assertVersion(7);

  const presets = [
    [
      env,
      {
        useBuiltIns: 'entry',
        targets: {
          browsers,
        },
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

  const preset = {
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
      require.resolve('@babel/plugin-proposal-function-sent'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-numeric-separator'),
      require.resolve('@babel/plugin-proposal-throw-expressions'),
      require.resolve('babel-plugin-add-module-exports'),
      // require.resolve('@babel/plugin-transform-runtime'),
    ],
  };

  // make sure react-hot-loader only enable in development
  // and dependency installed in project\
  /* istanbul ignore if */
  if (
    !api.env('production') &&
    requirePeer('react-hot-loader/babel', { optional: true })
  ) {
    preset.plugins.push(require.resolve('react-hot-loader/babel'));
  }
  return preset;
};
