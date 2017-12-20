'use strict';

module.exports.index = function* () {
  const content = require('client/alias');
  this.body = content;
};
