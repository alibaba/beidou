'use strict';

module.exports = {
  keys: 'secret',
  react: {
    assetPath: '/build',
    // Recording time at begining
    middlewares: [
      'time',
      'cache',
      'redux',
      'partial',
      'render',
      'doctype',
      'beautify',
    ],
  },
};
