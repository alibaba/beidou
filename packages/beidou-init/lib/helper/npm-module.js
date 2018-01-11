'use strict';

const spawn = require('cross-spawn');

const cwd = process.cwd();

// const spawn = require('child_process').spawn;

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
    // Perfer yarn as install faster
    if (/^\d+.\d+.\d+$/.test(stdout)) {
      cli = spawn('yarn', [], {
        cwd: targetDir || cwd,
        stdio: 'inherit',
      });
    } else {
      cli = spawn('npm', ['i'], {
        cwd: targetDir || cwd,
        stdio: 'inherit',
      });
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
