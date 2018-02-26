'use strict';

const path = require('path');
const spawn = require('cross-spawn');
const BaseCommand = require('./base');

class DevCommand extends BaseCommand {
  * run(cwd, args = []) {
    this.cwd = cwd;
    yield this.startDev(cwd, args);

    // done
    this.printUsage();
  }

  /**
   * start application
   * @param {String} cwd - cwd
   * @return {promise}
   */
  * startDev(cwd, args) {
    const bin = path.join(__dirname, '../dev');
    const cli = spawn(bin, args, {
      cwd,
      stdio: 'inherit',
    });

    return new Promise((resolve, reject) => {
      cli.on('close', (status) => {
        if (status === 0) {
          resolve();
        } else {
          reject(
            new Error(
              `failed to start app in development mode, error message: ${status}`
            )
          );
        }
      });
    });
  }

  /**
   * print usage guide
   */
  printUsage() {
    this.log('app started'.green);
  }

  /**
   * help
   */
  help() {
    return 'Start app in development mode';
  }
}

module.exports = DevCommand;
