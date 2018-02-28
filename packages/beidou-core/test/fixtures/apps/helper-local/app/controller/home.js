'use strict';

exports.index = function* () {
  const resource = this.helper.asset('main.js');
  this.body = resource;
};
