'use strict';

const path = require('path');
const fs = require('fs');
const spawn = require('cross-spawn');
const BaseCommand = require('./base');

class BuildCommand extends BaseCommand {
  * run(cwd, args = []) {
    this.cwd = cwd;

    yield this.build(cwd, args);

    // done
    this.printUsage();
  }

  /**
   * build application
   * @param {String} cwd - cwd
   * @param {Array} args - args
   * @return {promise}
   */
  * build(cwd, args) {
    const bin = detectBinFile(cwd);
    // console.log('bin: %s, args %o, cwd: %s', bin, args, cwd);
    const cli = spawn(bin, args, {
      cwd,
      stdio: 'inherit',
    });

    return new Promise((resolve, reject) => {
      cli.on('close', (status) => {
        if (status === 0) {
          resolve(0);
        } else {
          reject(new Error(`Build failed, error message: ${status}`));
        }
      });
    });
  }

  /**
   * print usage guide
   */
  printUsage() {
    this.log('Build finished'.green);
  }

  /**
   * help
   */
  help() {
    return 'Build application';
  }
}

function detectBinFile(dir) {
  const binOfBeidouBuild = path.join(dir, 'node_modules/.bin/beidou-build');
  const binOfWebpackBuild = path.join(dir, 'node_modules/.bin/webpack-build');
  if (fs.existsSync(binOfBeidouBuild)) {
    return binOfBeidouBuild;
  } else if (fs.existsSync(binOfWebpackBuild)) {
    return binOfWebpackBuild;
  }
  throw new Error(`no build bin file found in: ${dir}`);
}

module.exports = BuildCommand;
