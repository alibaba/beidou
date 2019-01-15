'use strict';

const is = require('is');

class Plugin {
  constructor(...args) {
    if (is.function(args[0])) {
      [this.class] = args;
      this.alias = args[0].name;
    } else if (is.object(args[0])) {
      [this.object] = args;
      this.alias = args[0].constructor.name;
    } else {
      throw new Error('Class Plugin constructor error ! ');
    }
    if (args[1]) {
      [, this.options] = args;
    }
    if (args[2]) {
      [, , this.alias] = args;
    }
  }

  init() {
    if (this.object) {
      return this.object;
    } else if (this.options) {
      return new this.class(this.options);
    } else {
      return new this.class();
    }
  }
}

module.exports = Plugin;
