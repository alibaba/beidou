'use strict';

/**
 * @namespace Beidou
 */

const beidou = require('./lib/beidou');

module.exports = require('egg');

/**
 * @member {Application} Beidou#Application
 * @since 1.0.0
 */
module.exports.Application = beidou.Application;

/**
 * @member {Agent} Beidou#Agent
 * @since 1.0.0
 */
module.exports.Agent = beidou.Agent;


module.exports.startCluster = beidou.startCluster;
