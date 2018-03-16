'use strict';

const path = require('path');

module.exports = appInfo => ({
  // Serve static resources in webpack build directory
  static: {
    prefix: '/build',
    dir: path.join(appInfo.baseDir, 'build/'),
    dynamic: false,
  },
});
