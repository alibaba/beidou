'use strict';

/**
 * Loader
 */

const appWorkerLoaderExtend = require('./app-worker-loader');
const agentWorkerLoaderExtend = require('./agent-worker-loader');

module.exports = function (target) {
  appWorkerLoaderExtend(target);
  agentWorkerLoaderExtend(target);
};
