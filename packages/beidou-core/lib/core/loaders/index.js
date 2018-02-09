'use strict';

/**
 * Loader
 */

const appWorkerLoaderExtend = require('./app-worker-loader');

module.exports = function (target) {
  appWorkerLoaderExtend(target);
};
