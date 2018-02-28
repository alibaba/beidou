'use strict';

const { StartCommand } = require('egg-scripts');
const { getDefaultPort } = require('../helper');

module.exports = class StartCMD extends StartCommand {
  constructor(rawArgv) {
    const argv = getDefaultPort(rawArgv);
    argv.push('--framework=beidou-core');
    super(argv);
    this.usage = 'Usage: beidou start [dir] [options]';
  }
};
