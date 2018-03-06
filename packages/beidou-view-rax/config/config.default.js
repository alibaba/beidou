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
    assetHost: '',
    assetPath: '/build/',
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
    custom: {
      configPath: path.resolve(__dirname, './webpack.config.js'),
    },
  },
  isomorphic: {
    babel: {
      presets: [
        [
          require('babel-preset-env'),
          {
            targets: {
              node: true,
            },
            useBuiltIns: true,
            // debug: true,
          },
        ],
        require('babel-preset-stage-2'),
        require('babel-preset-rax'),
      ],
    },
    universal: {
      assets: ['.css'],
    },
  },
});
