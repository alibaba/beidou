'use strict';

const fs = require('fs');
const path = require('path');
const debug = require('debug')('beidou-cli');
const { Command } = require('egg-bin');
const { log } = require('../helper');
const {
  getArgvWithDefaultFramework = 'beidou',
  framework,
  cmdName,
} = require('../helper');

module.exports = class BuildCMD extends Command {
  constructor(rawArgv) {
    const argv = getArgvWithDefaultFramework(rawArgv);
    super(argv);
    this.usage = `Usage: ${cmdName} build [options]`;
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
    const buildPaths = [
      path.join(context.cwd, 'node_modules/beidou-webpack/bin/build.js'),
      path.join(__dirname, '../../../beidou-webpack/bin/build.js'),
      () => require.resolve('beidou-webpack/bin/build'),
    ];
    const buildBin = buildPaths.find(p =>
      fs.existsSync(typeof p === 'function' ? p() : p)
    );
    if (!buildBin) {
      log.error(
        `Add "${framework}" as your package dependency before run build command`
      );
      return;
    }
    const options = {
      execArgv: context.execArgv,
      env: Object.assign({ NODE_ENV: 'production' }, context.env),
    };
    debug('%s %j', buildBin, context);
    await this.helper.forkNode(buildBin, context.rawArgv, options);
  }
};
