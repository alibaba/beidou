'use strict';

class Rule {
  constructor(options, alias) {
    if (!options) {
      throw new Error('Class Rule contructor exceptionally ! ');
    }
    this.options = options;
    this.alias = alias || options.test;
  }

  init() {
    return this.options;
  }
}
module.exports = Rule;
