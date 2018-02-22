'use strict';

const path = require('path');
const BaseProgram = require('beidou-bin').Program;

class Program extends BaseProgram {
  constructor(...args) {
    super(...args);

    this.version = require('../package.json').version;

    this._commands = {};
    this._commands.init = path.join(__dirname, '/command/init-command.js');
  }
}

module.exports = Program;
