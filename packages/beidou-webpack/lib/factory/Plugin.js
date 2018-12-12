'use strict';

const is = require('is');

class Plugin {
  constructor(model, options, alias) {
    if (is.function(model)) {
      this.model = model;
      this.options = options;
      this.alias = alias || model.name;
    } else if (is.object(model)) {
      this.class = model;
      this.alias = alias || model.constructor.name;
    } else {
      throw new Error(
        'Class Plugin constructor expect function ! '
      );
    }
  }

  init() {
    if (this.class) {
      return this.class;
    } else if (this.options) {
      return new this.model(this.options);
    } else {
      return new this.model();
    }
  }

  reset(model, options) {
    if (is.object(model)) {
      this.class = model;
    } else if (is.function(model)) {
      this.model = model;
    }
    if (options) { this.options = options; }
  }
}

module.exports = Plugin;
