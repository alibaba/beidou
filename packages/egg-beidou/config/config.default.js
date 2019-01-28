'use strict';

const path = require('path');

module.exports = appInfo => ({
  beidou: {
    middlewares: [
      'render',
      'custom',
      'cache',
      'initialprops',
      'redux',
      'partial',
      'beautify',
      'doctype',
      'script',
      'style',
    ],
    doctype: '<!DOCTYPE html>',
    cache: true,
    static: true,
    stream: false,
  },
  view: {
    mapping: {
      '.js': 'beidou',
    },
    root: `${path.join(appInfo.baseDir, 'app/views')},${path.join(
      appInfo.baseDir,
      'clients'
    )}`,
  },
});
