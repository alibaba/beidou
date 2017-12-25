const spawn = require('cross-spawn');

const cwd = process.cwd();

// const spawn = require('child_process').spawn;

const NpmModule = {

  /**
   * npm i
   */
  install(targetDir) {
    const cli = spawn('npm', ['i'], {
      cwd: targetDir || cwd,
      stdio: 'inherit',
    });

    return new Promise((resolve, reject) => {
      cli.on('close', (status) => {
        if (status === 0) {
          resolve();
        } else {
          reject(new Error(`packages install failed, error message: ${status}`));
        }
      });
    });
  },
};

module.exports = NpmModule;
