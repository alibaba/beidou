'use strict';

const { CovCommand } = require('egg-bin');

module.exports = class CovCMD extends CovCommand {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: beidou cov [options]';
  }
};
