'use strict';

module.exports = {
  keys: 'secret',
  router: {
    entry: 'index',
  },
  react: {
    static: true,
    cache: false,
    beautify: true,
    assetPath: '/build',
  },
  webpack: {
    publicPath: '/build/',
    hmr: {
      // reload: true
    },
  },
};
