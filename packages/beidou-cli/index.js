'use strict';

const path = require('path');
const { Command } = require('egg-bin');
const pkg = require('./package.json');
const { log } = require('./lib/helper');

class BeidouCli extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: beidou [command] [options]';

    // load directory
    this.load(path.join(__dirname, 'lib/commands'));
    log.info(`v${pkg.version}`);
  }
}

module.exports = exports = BeidouCli;
