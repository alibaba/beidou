'use strict';

exports.index = function* () {
  this.body = this.app.serverEnv;
};
