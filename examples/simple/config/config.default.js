'use strict';

const path = require('path');

module.exports = appInfo => ({
  keys: 'secrets',
  view: {
    useHashAsset: true,
  },
  static: {
    dir: [
      {
        prefix: '/public',
        dir: path.join(appInfo.baseDir, '/app/public'),
      },
      {
        prefix: '/build',
        dir: path.join(appInfo.baseDir, '/build'),
      },
    ],
  },
});
