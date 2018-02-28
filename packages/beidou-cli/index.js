'use strict';

const path = require('path');
const { Command } = require('egg-bin');

class BeidouCli extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: beidou [command] [options]';

    // load directory
    this.load(path.join(__dirname, 'lib/commands'));
  }
}

module.exports = exports = BeidouCli;
