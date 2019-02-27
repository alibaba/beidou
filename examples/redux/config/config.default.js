'use strict';

const path = require('path');

module.exports = appInfo => ({
  keys: 'secret',
  router: {
    entry: 'page',
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
