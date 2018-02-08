'use strict';

const spawn = require('cross-spawn');

const cwd = process.cwd();

const NpmModule = {
  /**
   * npm i
   */
  install(targetDir) {
    // Check yarn exists
    const { stdout } = spawn.sync('yarn', ['--version'], {
      stdio: 'inherit',
    });

    let cli;
    const options = {
      cwd: targetDir || cwd,
      stdio: 'inherit',
    };
    // Perfer yarn as install faster
    if (/^\d+.\d+.\d+$/.test(String(stdout))) {
      cli = spawn('yarn', [], options);
    } else {
      cli = spawn('npm', ['i'], options);
    }

    return new Promise((resolve, reject) => {
      cli.on('close', (status) => {
        if (status === 0) {
          resolve();
        } else {
          reject(
            new Error(`packages install failed, error message: ${status}`)
          );
        }
      });
    });
  },
};

module.exports = NpmModule;
