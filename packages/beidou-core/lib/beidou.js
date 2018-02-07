'use strict';

/**
 * Module dependencies.
 */
const egg = require('egg');
const path = require('path');

const EGG_PATH = path.join(__dirname, '..');
const startCluster = egg.startCluster;
const BeidouApplication = require('./core/worker/index');
const BeidouAgent = require('./core/agent/index');

module.exports = egg;
module.exports.Application = BeidouApplication;
module.exports.Agent = BeidouAgent;

/**
 * @member {AppWorkerLoader} Beidou#AppWorkerLoader
 * @since 1.0.0
 */
module.exports.AppWorkerLoader = require('./core/loaders').AppWorkerLoader;

/**
 * @member {AgentWorkerLoader} Beidou#AgentWorkerLoader
 * @since 1.0.0
 */
module.exports.AgentWorkerLoader = require('./core/loaders').AgentWorkerLoader;

module.exports.startCluster = function (options, callback) {
  options = options || /* istanbul ignore next */ {};
  options.customEgg = EGG_PATH;
  startCluster(options, callback);
};
