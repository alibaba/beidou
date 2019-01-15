'use strict';

const chalk = require('chalk');

class Logger {
  constructor() {
    this.prefix = chalk.blue('[beidou-cli] ');
  }

  info(...args) {
    args[0] = this.prefix + args[0];
    console.log(...args);
  }

  warn(...args) {
    args[0] = this.prefix + chalk.yellow(`warn ${args[0]}`);
    console.log(...args);
  }

  error(...args) {
    args[0] = this.prefix + chalk.red(`error ${args[0]}`);
    console.log(...args);
  }

  green(...args) {
    args[0] = this.prefix + chalk.green(args[0]);
    console.log(...args);
  }

  red(...args) {
    args[0] = this.prefix + chalk.red(args[0]);
    console.log(...args);
  }
}

module.exports = new Logger();
