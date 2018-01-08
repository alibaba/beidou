'use strict';

exports.index = function* () {
  const resource = this.helper.resolveResource('main.js');
  this.body = resource;
}
