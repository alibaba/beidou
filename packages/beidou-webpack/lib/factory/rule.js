'use strict';

class Rule {
  constructor(options, alias) {
    if (!options) {
      throw new Error('Class Rule contructor exceptionally ! ');
    }
    this.options = options;
    this.alias = alias || options.test;
  }

  toConfig(factory) {
    if (this.options.processor) {
      const dynamicOptions = this.options.processor(factory);
      const options = Object.assign({}, this.options, dynamicOptions);
      delete options.processor;
      return options;
    }
    return this.options;
  }
}
module.exports = Rule;
