'use strict';

const { StartCommand } = require('egg-scripts');
const { getArgvWithDefaultConfig, configs } = require('../helper');

module.exports = class StartCMD extends StartCommand {
  constructor(rawArgv) {
    const argv = getArgvWithDefaultConfig(rawArgv);
    super(argv);
    this.usage = `Usage: ${configs.cmdName} start [dir] [options]`;
  }
};
