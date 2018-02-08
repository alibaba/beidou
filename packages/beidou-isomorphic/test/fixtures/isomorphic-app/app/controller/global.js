'use strict';

module.exports.env = function* () {
  this.body = __ENV__;
};

module.exports.server = function* () {
  this.body = __SERVER__;
};

module.exports.client = function* () {
  this.body = __CLIENT__;
};

module.exports.dev = function* () {
  this.body = __DEV__;
};
