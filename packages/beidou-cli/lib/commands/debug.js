'use strict';

const { DebugCommand } = require('egg-bin');
const { getArgvWithDefaultConfig, configs } = require('../helper');

module.exports = class DebugCMD extends DebugCommand {
  constructor(rawArgv) {
    const argv = getArgvWithDefaultConfig(rawArgv);
    super(argv);
    this.usage = `Usage: ${configs.cmdName} debug [dir] [options]`;
  }
};
