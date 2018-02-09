'use strict';

const helper = {
  /**
   * generate asset url, concat with host and path defined in `config.rax`
   * @param {*} filename asset file name
   */
  asset(filename) {
    return this[Symbol.for('beidou#asset')](filename, this.config.rax);
  },
};

module.exports = helper;
