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
  if (process.env.PORT) {
    findPort = true;
    argv.push(`--port=${process.env.PORT}`);
  }
  if (!findPort) {
    argv.push(`--port=${configs.port}`);
  }
  if (!findFramework) {
    argv.push(`--framework=${configs.framework}`);
  }
  return argv;
};

exports.getArgvWithDefaultFramework = (argv) => {
  let findFramework = false;
  for (const arg of argv) {
    if (arg.includes('--framework')) {
      findFramework = true;
    }
  }
  if (!findFramework) {
    argv.push(`--framework=${configs.framework}`);
  }

  return argv;
};

exports.setDefaultDev = (argv) => {
  let findDev = false;
  for (const arg of argv) {
    if (arg.includes('--dev')) {
      findDev = true;
    }
  }

  if (!findDev) {
    argv.push('--dev=true');
  }
  return argv;
};
