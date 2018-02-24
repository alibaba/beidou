'use strict';

module.exports = {
  keys: 'secret',
  react: {
    assetPath: '/build',
  },
  isomorphic: {
    universal: {
      assets: ['.css'],
    },
  },
};
