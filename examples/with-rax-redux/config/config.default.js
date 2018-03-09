'use strict';

module.exports = {
  keys: 'secrets',
  isomorphic: {
    babel: {
      extensions: ['.jsx'],
    },
  },
  rax: {
    static: true,
    cache: false,
  },
};
