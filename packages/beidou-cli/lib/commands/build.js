'use strict';

const path = require('path');
const debug = require('debug')('beidou-cli');
const { Command } = require('egg-bin');
// const { log } = require('../helper');

module.exports = class BuildCMD extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: beidou build [options]';
    this.options = {
      target: {
        description: 'build target, node or browser',
        alias: 't',
        type: 'string',
      },
    };
  }

  get description() {
    return 'Build beidou assets';
  }

  async run(context) {
    // log.info(JSON.stringify(context, null, 2));
    const buildBin = path.join(context.cwd, 'node_modules/.bin/beidou-build');
    const options = {
      execArgv: context.execArgv,
      env: Object.assign({ NODE_ENV: 'production' }, context.env),
    };
    debug('%s %j', this.serverBin, context);
    await this.helper.forkNode(buildBin, context.rawArgv, options);
  }
};
