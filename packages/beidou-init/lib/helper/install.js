'use strict';

const spawn = require('cross-spawn');

module.exports = function (targetDir, registry = '') {
  // Check yarn exists
  const { stdout } = spawn.sync('yarn', ['--version']);
  let args = [];
  if (registry) {
    args = [`--registry=${registry}`];
  }
  let cli;
  const options = {
    cwd: targetDir || process.cwd(),
    stdio: 'inherit',
  };
  // Prefer yarn as install faster
  if (/\d+.\d+.\d+/.test(String(stdout))) {
    console.log(`install with yarn ${args}`.green);
    cli = spawn('yarn', args, options);
  } else {
    console.log(`install with npm i ${args}`.green);
    cli = spawn('npm', ['i'].concat(args), options);
  }

  return new Promise((resolve, reject) => {
    cli.on('close', (status) => {
      if (status === 0) {
        resolve();
      } else {
        reject(new Error(`packages install failed, error message: ${status}`));
      }
    });
  });
};
