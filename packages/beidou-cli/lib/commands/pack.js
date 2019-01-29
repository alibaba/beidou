'use strict';

const fs = require('fs');
const path = require('path');
const { Command } = require('egg-bin');
const { log } = require('../helper');
const {
  getArgvWithDefaultFramework = 'beidou',
  cmdName,
  configs,
} = require('../helper');

module.exports = class BuildCMD extends Command {
  constructor(rawArgv) {
    const argv = getArgvWithDefaultFramework(rawArgv);
    super(argv);
    this.usage = `Usage: ${cmdName} command [options]`;
    this.options = {
      config: {
        description: 'webpack config file path',
        alias: 'c',
        type: 'string',
      },
    };
  }

  get description() {
    return 'Beidou build assets for egg-beidou plugin';
  }

  async run(context) {
    const filePaths = [];
    if (context.argv.webpack) {
      filePaths.push(
        path.resolve(context.argv.webpack),
        path.join(context.cwd, context.argv.webpack)
      );
    }

    filePaths.push(path.join(context.cwd, 'node_modules', 'webpack'));

    const webpackPath = filePaths.find(p => fs.existsSync(p));
    if (!webpackPath || !fs.existsSync(webpackPath)) {
      log.error('Please install webpack dependence');
      return;
    }
    const webpack = require(webpackPath);
    const webpackConfig = require(configs.webpackDefaultConfig)({
      root: context.cwd,
    });
    if (!context.argv.config) {
      log.error(`Custom webpack path error. ${context.argv.config}`);
      return;
    }
    const customConfigPath = [
      path.resolve(context.argv.config),
      path.join(context.cwd, context.argv.config),
    ].find(p => fs.existsSync(p));
    console.log(customConfigPath);
    if (!customConfigPath) {
      log.error(`Custom webpack path error. ${context.argv.config}`);
      return;
    }
    const customConfig = require(customConfigPath);
    if (!context.argv.overrite) {
      Object.assign(webpackConfig, customConfig, { target: 'node' });
    }

    const compiler = webpack(webpackConfig);

    compiler.run((err, stats) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      if (stats) {
        fs.writeFileSync(path.join(process.cwd(), '.stats'), stats);
        console.log(
          stats.toString({
            colors: true,
            children: false,
          })
        );
      }
      console.log('\nBuild finished\n');
    });
  }
};
