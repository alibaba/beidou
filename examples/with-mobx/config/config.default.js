'use strict';

module.exports = {
  keys: 'secret',
  router: {
    entry: 'view',
  },
  isomorphic: {
    universal: {
      assets: ['.css'],
    },
    babel: {
      plugins: [require.resolve('babel-plugin-transform-decorators-legacy')],
    },
  },
};
