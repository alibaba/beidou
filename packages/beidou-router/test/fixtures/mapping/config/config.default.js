'use strict';

module.exports = function () {
  const config = {};
  config.router = {
    mapping: {
      about: 'get',
      login: ['get', 'post'],
      user: {
        ':id': 'get',
      },
    },
  };
  return config;
};
