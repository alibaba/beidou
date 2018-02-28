'use strict';

const { StopCommand } = require('egg-scripts');

module.exports = class StopCMD extends StopCommand {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: beidou stop [dir] [--title=example]';
  }
};
