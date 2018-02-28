'use strict';

const { DevCommand } = require('egg-bin');
const { getArgvWithDefaultConfig } = require('../helper');

module.exports = class DevCMD extends DevCommand {
  constructor(rawArgv) {
    const argv = getArgvWithDefaultConfig(rawArgv);
    super(argv);
    this.usage = 'Usage: beidou dev [dir] [options]';
  }
};
