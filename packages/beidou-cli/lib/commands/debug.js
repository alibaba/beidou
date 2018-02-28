'use strict';

const { DebugCommand } = require('egg-bin');
const { getDefaultPort } = require('../helper');

module.exports = class DebugCMD extends DebugCommand {
  constructor(rawArgv) {
    const argv = getDefaultPort(rawArgv);
    argv.push('--framework=beidou-core');
    super(argv);
    this.usage = 'Usage: beidou debug [dir] [options]';
  }
};
