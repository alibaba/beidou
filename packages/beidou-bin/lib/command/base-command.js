'use strict';

require('colors');

class Command {
  constructor() {
    this.name = 'beidou-bin';
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
