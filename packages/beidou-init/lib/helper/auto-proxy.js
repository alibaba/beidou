

const spawn = require('cross-spawn');

const cwd = process.cwd();

const ProxyModule = {

  /**
   * npm run proxy
   */
  proxy(targetDir) {
    const cli = spawn('npm', ['run', 'proxy'], {
      cwd: targetDir || cwd,
      stdio: 'inherit',
    });

    return new Promise((resolve, reject) => {
      cli.on('close', (status) => {
        if (status === 0) {
          resolve();
        } else {
          reject(new Error(`Auto proxy failed, error message: ${status}`));
        }
      });
    });
  },
};

module.exports = ProxyModule;
