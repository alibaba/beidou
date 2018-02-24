'use strict';

module.exports = {
  keys: 'secret',
  router: {
    entry: 'page',
  },
  isomorphic: {
    universal: {
      assets: ['.scss', '.png'],
    },
  },
};
