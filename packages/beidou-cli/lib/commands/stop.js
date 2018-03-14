'use strict';

const { StopCommand } = require('egg-scripts');
const { configs } = require('../helper');

module.exports = class StopCMD extends StopCommand {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = `Usage: ${configs.cmdName} stop [dir] [--title=example]`;
  }
};
