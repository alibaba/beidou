'use strict';

const client = require('../../client');

module.exports.less = function* () {
  this.body = client.less;
};

module.exports.sass = function* () {
  this.body = client.sass;
};

module.exports.others = function* () {
  this.body = client.unSupport;
};
