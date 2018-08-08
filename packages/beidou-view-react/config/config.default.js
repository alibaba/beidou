'use strict';

const path = require('path');

module.exports = appInfo => ({
  /**
   * React view options
   * @member Config#react
   */
  react: {
    middlewares: [
      'cache',
      'initialprops',
      'redux',
      'partial',
      'render',
      'beautify',
      'doctype',
    ],
    beautify: false,
    cache: true,
    // Use `renderToStaticMarkup` if true, otherwise `renderToString`
    static: false,
    doctype: '<!DOCTYPE html>',
    assetHost: '',
    assetPath: '/build/',
  },
  view: {
    defaultViewEngine: 'react',
    defaultExtension: '.jsx',
    root: `${path.join(appInfo.baseDir, 'app/views')},${path.join(
      appInfo.baseDir,
      'client'
    )}`,
  },
});
