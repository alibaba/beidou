'use strict';

const chalk = require('chalk');
const spawn = require('cross-spawn');
const log = require('./logger');

module.exports = function (targetDir, registry = '') {
  // Check yarn exists
  const { stdout } = spawn.sync('yarn', ['--version']);
  let args = [];
  if (registry) {
    args = [`--registry=${registry}`];
  }
  let cli;
  const options = {
    cwd: targetDir || process.cwd(),
    stdio: 'inherit',
  };
  // Prefer yarn as install faster
  if (/\d+.\d+.\d+/.test(String(stdout))) {
    log.info(chalk.green(`install with yarn ${args}`));
    cli = spawn('yarn', args, options);
  } else {
    log.info(chalk.green(`install with npm i ${args}`));
    cli = spawn('npm', ['i'].concat(args), options);
  }

  return new Promise((resolve, reject) => {
    cli.on('close', (status) => {
      if (status === 0) {
        resolve();
      } else {
        reject(new Error(`packages install failed, error message: ${status}`));
      }
    });
  });
};
