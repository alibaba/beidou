'use strict';

const path = require('path');
const spawn = require('cross-spawn');
const BaseCommand = require('./base');

class StopCommand extends BaseCommand {
  * run(cwd, args = []) {
    this.cwd = cwd;
    yield this.stop(cwd, args);

    this.printUsage();
  }

  /**
   * start application
   * @param {String} cwd - cwd
   * @return {promise}
   */
  * stop(cwd, args) {
    // egg-scripts bin file
    // const binPath = path.join(cwd, 'node_modules/.bin/eggctl');
    const binPath = path.join(__dirname, '../../node_modules/.bin/eggctl');
    args.unshift('stop');
    const cli = spawn(binPath, args, {
      cwd,
      stdio: 'inherit',
    });

    return new Promise((resolve, reject) => {
      cli.on('close', (status) => {
        if (status === 0) {
          resolve();
        } else {
          reject(new Error(`failed to stop app, error message: ${status}`));
        }
      });
    });
  }

  /**
   * print usage guide
   */
  printUsage() {
    this.log('app stopped'.green);
  }

  /**
   * help
   */
  help() {
    return 'Stop beidou processes';
  }
}

module.exports = StopCommand;
