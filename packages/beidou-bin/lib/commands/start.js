'use strict';

const path = require('path');
const spawn = require('cross-spawn');
const BaseCommand = require('./base');

class StartCommand extends BaseCommand {
  * run(cwd, args = []) {
    this.cwd = cwd;
    yield this.start(cwd, args);

    // done
    this.printUsage();
  }

  /**
   * start application
   * @param {String} cwd - cwd
   * @return {promise}
   */
  * start(cwd, args) {
    // egg-scripts bin file
    // const binPath = path.join(cwd, 'node_modules/.bin/eggctl');
    const binPath = path.join(__dirname, '../../node_modules/.bin/eggctl');
    const pkg = require(path.join(cwd, 'package.json'));
    const title = `beidou-server-${pkg.name}`;
    args.unshift('start');
    args.push('--framework', 'beidou-core');
    if (!args.includes('--title')) {
      args.push('--title', title);
    }
    if (!args.includes('--port') && !process.env.PORT) {
      args.push('--port', '6001');
    }
    const cli = spawn(binPath, args, {
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
              `failed to start app in production mode, error message: ${status}`
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
    return 'Start app in production mode';
  }
}

module.exports = StartCommand;
