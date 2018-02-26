'use strict';

module.exports = {
  keys: 'secrets',
  isomorphic: {
    universal: {
      assets: ['.scss'],
    },
    babel: {
      extensions: ['.jsx'],
    },
  },
  react: {
    assetPath: '/build/',
  },
};
