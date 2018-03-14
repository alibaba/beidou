'use strict';

const { DevCommand } = require('egg-bin');
const { getArgvWithDefaultConfig, configs } = require('../helper');

module.exports = class DevCMD extends DevCommand {
  constructor(rawArgv) {
    const argv = getArgvWithDefaultConfig(rawArgv);
    super(argv);
    this.usage = `Usage: ${configs.cmdName} dev [dir] [options]`;
  }
};
