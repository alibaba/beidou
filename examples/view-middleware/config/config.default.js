'use strict';

module.exports = {
  keys: 'secret',
  react: {
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
    beautify: true,
  },
};
