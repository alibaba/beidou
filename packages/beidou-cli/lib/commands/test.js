'use strict';

const { TestCommand } = require('egg-bin');

module.exports = class TestCMD extends TestCommand {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: beidou test [files] [options]';
  }
};
