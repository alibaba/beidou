'use strict';

const { StartCommand } = require('egg-scripts');
const { getArgvWithDefaultConfig } = require('../helper');

module.exports = class StartCMD extends StartCommand {
  constructor(rawArgv) {
    const argv = getArgvWithDefaultConfig(rawArgv);
    super(argv);
    this.usage = 'Usage: beidou start [dir] [options]';
  }
};
