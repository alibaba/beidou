'use strict';

module.exports = {
  beidou(...args) {
    this.type = 'html';
    this.app.beidou.ctx = this;
    return this.app.beidou.render(...args);
  },
};
