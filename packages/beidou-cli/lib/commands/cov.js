'use strict';

const { CovCommand } = require('egg-bin');
const { configs } = require('../helper');

module.exports = class CovCMD extends CovCommand {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = `Usage: ${configs.cmdName} cov [options]`;
  }
};
