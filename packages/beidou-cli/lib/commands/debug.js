'use strict';

const { DebugCommand } = require('egg-bin');
const { getArgvWithDefaultConfig } = require('../helper');

module.exports = class DebugCMD extends DebugCommand {
  constructor(rawArgv) {
    const argv = getArgvWithDefaultConfig(rawArgv);
    super(argv);
    this.usage = 'Usage: beidou debug [dir] [options]';
  }
};
