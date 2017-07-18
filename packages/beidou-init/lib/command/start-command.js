/**
 * @author Holden <holdenwei@qq.com>
 */
'use strict';

const spawn = require('cross-spawn');
const BaseCommand = require('./base-command');

require('colors');

class StartCommand extends BaseCommand {

  * run(cwd, args) {
    let processedArgs = args || [];
    this.cwd = cwd;

    yield this.start(cwd);

    // done
    this.printUsage();
  }

  /**
   * start application
   * * @param {String} cwd - cwd
   * @return {promise}
   */
  * start(cwd) {
    const cli = spawn('npm', ['run', 'start'], {
      cwd: cwd,
      stdio: 'inherit'
    });

    return new Promise((resolve, reject) => {
      cli.on('close', status => {
        if (status === 0) {
          resolve();
        } else {
          reject(new Error(`failed to start app, error message: ${status}`));
        }
      });
    });
  }

  /**
   * print usage guide
   */
  printUsage() {
    this.log(`app started`.green);
  }

  /**
   * help
   */
  help() {
    return 'start app';
  }
}
;

module.exports = StartCommand;