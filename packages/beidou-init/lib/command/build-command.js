

const spawn = require('cross-spawn');
const BaseCommand = require('./base-command');

require('colors');

class BuildCommand extends BaseCommand {
  * run(cwd) {
    this.cwd = cwd;

    yield this.build(cwd);

    // done
    this.printUsage();
  }

  /**
   * build application
   * * @param {String} cwd - cwd
   * @return {promise}
   */
  * build(cwd) {
    const cli = spawn('npm', ['run', 'build'], {
      cwd,
      stdio: 'inherit',
    });

    return new Promise((resolve, reject) => {
      cli.on('close', (status) => {
        if (status === 0) {
          resolve();
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


module.exports = BuildCommand;
