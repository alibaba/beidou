'use strict';

require('colors');
const helper = require('../helper');

class Command {
  constructor() {
    this.helper = helper;
    this.name = 'beidou-init';
  }

  run(/* cwd, args */) {
    throw new Error('Must impl this method');
  }

  help() {
    throw new Error('Must impl this method');
  }

  /**
   * log with prefix
   */
  log(...args) {
    args[0] = `[${this.name}] `.blue + args[0];
    console.log(...args);
  }
}

module.exports = Command;
