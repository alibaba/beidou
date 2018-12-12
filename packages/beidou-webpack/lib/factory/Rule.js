'use strict';

const is = require('is');

class Rule {
  constructor(options, alias) {
    if (!options || !is.object(options)) {
      throw new Error(
        'Class Plugin contructor exceptionally ! '
      );
    }
    this.options = options;
    this.alias = alias || options.test;
  }

  reset(options) {
    this.options = options;
  }
}
module.exports = Rule;
