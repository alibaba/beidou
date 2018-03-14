'use strict';

const { TestCommand } = require('egg-bin');
const { configs } = require('../helper');

module.exports = class TestCMD extends TestCommand {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = `Usage: ${configs.cmdName} test [files] [options]`;
  }
};
