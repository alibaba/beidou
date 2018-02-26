'use strict';

module.exports = {
  keys: 'secret',
  router: {
    entry: 'page',
  },
  react: {
    assetPath: '/build',
  },
  isomorphic: {
    universal: {
      assets: ['.scss', '.png'],
    },
  },
};
