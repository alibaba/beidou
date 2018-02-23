'use strict';

const path = require('path');

module.exports = {
  keys: 'secret',
  webpack: {
    config: path.join(__dirname, './webpack.config.js'),
  },
  router: {
    root: '/pages',
    entry: 'page',
  },
  isomorphic: {
    polyfill: false,
    universal: {
      assets: ['.less', '.png'],
    },
  },
  react: {
    static: true,
    cache: true,
    beautify: false,
    assetPath: '/public',
  },
  security: {
    domainWhiteList: [
      'localhost:6001',
    ],
  },
  session: {
    key: 'BEIDOU_SESS',
    maxAge: 1 * 3600 * 1000, // 1 hour
    httpOnly: true,
    encrypt: true,
  },

  static: {
    dir: path.join(__dirname, '../build/'),
  },
};
