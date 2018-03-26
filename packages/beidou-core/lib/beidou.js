/**
 * Module dependencies.
 */

'use strict';

const path = require('path');

const EGG_PATH = path.join(__dirname, '..');
const loaderExtend = require('./core/loaders');
const applicationExtend = require('./core/worker/application');
const agentExtend = require('./core/worker/agent');

module.exports = function (target) {
  loaderExtend(target);
  applicationExtend(target);
  agentExtend(target);
  const { startCluster } = target;
  target.startCluster = function (options, callback) {
    options = options || /* istanbul ignore next */ {};
    options.framework = EGG_PATH;
    startCluster(options, callback);
  };

  return target;
};
