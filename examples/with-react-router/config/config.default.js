'use strict';

const path = require('path');

module.exports = {
  keys: 'secret',
  webpack: {
    resolve: {
      alias: {
        client: path.join(__dirname, '../client'),
      },
    },
  },

  react: {
    assetPath: '/build',
  },
};
