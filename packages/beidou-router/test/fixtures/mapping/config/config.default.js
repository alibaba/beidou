'use strict';

module.exports = function () {
  const exports = {};
  exports.router = {
    mapping: {
      about: 'get',
      login: ['get', 'post'],
      user: {
        ':id': 'get',
      }
    },
  }
  return exports;
};
