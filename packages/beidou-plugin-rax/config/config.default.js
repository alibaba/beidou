'use strict';

const path = require('path');

module.exports = appInfo => ({
  rax: {
    middlewares: [
      'cache',
      'redux',
      'partial',
      'raxRender',
      'doctype',
      'beautify',
    ],
    beautify: true,
    static: false,
    cache: false,
    doctype: '<!DOCTYPE html>',
  },
  view: {
    mapping: {
      '.jsx': 'rax',
    },
    defaultViewEngine: 'rax',
    defaultExtension: '.jsx',
    root: `${path.join(appInfo.baseDir, 'app/views')},${path.join(
      appInfo.baseDir,
      'client'
    )}`,
  },
  webpack: {
    config: path.resolve(__dirname, './webpack.config.js'),
    hmr: false,
  },
  isomorphic: {
    babel: {
      presets: [
        [
          require.resolve('babel-preset-env'),
          {
            targets: {
              node: 'current',
            },
          },
        ],
        require.resolve('babel-preset-rax'),
      ],
    },
    universal: {
      assets: ['.css'],
    },
  },
});
