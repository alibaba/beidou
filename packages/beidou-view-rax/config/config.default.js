'use strict';

const path = require('path');

module.exports = appInfo => ({
  rax: {
    middlewares: [
      'cache',
      'initialprops',
      'redux',
      'partial',
      'raxRender',
      'doctype',
      'beautify',
    ],
    beautify: false,
    cache: true,
    static: false,
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
    universal: {
      assets: ['.css'],
    },
  },
});
