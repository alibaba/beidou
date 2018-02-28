'use strict';

const { DevCommand } = require('egg-bin');

module.exports = class DevCMD extends DevCommand {
  constructor(rawArgv) {
    rawArgv.push('--framework=beidou-core');
    super(rawArgv);
    this.usage = 'Usage: beidou dev [dir] [options]';
    this.defaultPort = 6001;
  }
};
