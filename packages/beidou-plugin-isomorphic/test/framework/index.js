'use strict';

require('babel-register');

/**
 * Module dependencies.
 */
const egg = require('egg');
const path = require('path');

module.exports = egg;

module.exports.Application = egg.Application;

/**
 * @member {Agent} Beidou#Agent
 * @since 1.0.0
 */
module.exports.Agent = egg.Agent;


module.exports.startCluster = egg.startCluster;


