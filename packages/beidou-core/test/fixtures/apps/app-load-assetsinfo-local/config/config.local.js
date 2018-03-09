'use strict';

const path = require('path');

module.exports = antx => ({
  debugDir: `${antx.baseDir}/debug`,
  webpack: {
    custom: {
      configPath: path.resolve(__dirname, '../webpack/webpack.config.dev.js'),
    }
  },
});
