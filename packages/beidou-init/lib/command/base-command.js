'use strict';

const helper = require('../helper');
const { BaseCommand } = require('beidou-bin');

class Command extends BaseCommand {
  constructor(...args) {
    super(...args);
    this.helper = helper;
    this.name = 'beidou-init';
  }
}

module.exports = Command;
