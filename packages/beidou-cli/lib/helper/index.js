'use strict';

exports.install = require('./install');
exports.getRegistry = require('./registry');
exports.log = require('./logger');
const configs = require('./configs');

exports.configs = configs;

exports.getArgvWithDefaultConfig = (argv) => {
  let findPort = false;
  let findFramework = false;
  for (const arg of argv) {
    if (arg.includes('--port')) {
      findPort = true;
    } else if (arg.includes('--framework')) {
      findFramework = true;
    }
  }

  if (!findPort) {
    argv.push(`--port=${configs.port}`);
  }
  if (!findFramework) {
    argv.push(`--framework=${configs.framework}`);
  }
  return argv;
};
