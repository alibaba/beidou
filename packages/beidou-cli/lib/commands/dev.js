'use strict';

const { DevCommand } = require('egg-bin');
const {
  getArgvWithDefaultConfig,
  setDefaultDev,
  configs,
} = require('../helper');

module.exports = class DevCMD extends DevCommand {
  constructor(rawArgv) {
    const argv = getArgvWithDefaultConfig(rawArgv);
    super(setDefaultDev(argv));
    this.usage = `Usage: ${configs.cmdName} dev [dir] [options]`;
  }
};
