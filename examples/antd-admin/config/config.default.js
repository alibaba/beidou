const path = require('path');

module.exports = {
  keys: 'secret',
  webpack: {
    config: path.resolve(__dirname, '../webpack/webpack.config.js'),
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
};
