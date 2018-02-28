'use strict';

exports.install = require('./install');
exports.getRegistry = require('./registry');
exports.log = require('./logger');

exports.getDefaultPort = (argv) => {
  let findPort = false;
  for (const arg of argv) {
    if (arg.includes('port')) {
      findPort = true;
    }
  }
  // Set default port
  if (!findPort) {
    argv.push('--port=6001');
  }
  return argv;
};
