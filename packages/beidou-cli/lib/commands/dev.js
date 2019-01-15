'use strict';

const path = require('path');
const fs = require('fs');
const { DevCommand } = require('egg-bin');
const {
  getArgvWithDefaultConfig,
  setDefaultDev,
  configs,
  log,
} = require('../helper');

module.exports = class DevCMD extends DevCommand {
  constructor(rawArgv) {
    const argv = getArgvWithDefaultConfig(rawArgv);
    super(setDefaultDev(argv));
    this.usage = `Usage: ${configs.cmdName} dev [dir] [options]`;
  }

  * run(context) {
    const { argv, cwd } = context;
    let baseDir = argv._[0] || argv.baseDir || cwd;
    if (!path.isAbsolute(baseDir)) baseDir = path.join(cwd, baseDir);
    const pkgFile = path.join(baseDir, 'package.json');
    if (fs.existsSync(pkgFile)) {
      const pkgInfo = require(pkgFile);
      if (pkgInfo && pkgInfo.config && pkgInfo.config.typescript) {
        log.green('TS Helper enabled for TypeScript Project');
        const helperConfig = require('egg-ts-helper').defaultConfig;

        helperConfig.framework = configs.framework;

        require('egg-ts-helper/register');
      }
    }

    yield super.run(context);
  }
};
