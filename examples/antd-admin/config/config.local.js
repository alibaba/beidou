'use strict';

module.exports = {
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
