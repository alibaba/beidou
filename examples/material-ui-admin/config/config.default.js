'use strict';

const path = require('path');

const alias = {
  assets: path.join(__dirname, '../client/src/assets'),
  variables: path.join(__dirname, '../client/src/variables'),
  components: path.join(__dirname, '../client/src/components'),
  containers: path.join(__dirname, '../client/src/containers'),
  routes: path.join(__dirname, '../client/src/routes'),
  views: path.join(__dirname, '../client/src/views'),
};

module.exports = {
  keys: 'secret',
  router: {
    root: '/src',
    entry: 'view',
  },
  react: {
    static: true,
  },
  webpack: {
    resolve: {
      alias,
    },
  },
  isomorphic: {
    alias,
  },
};
