
'use strict';

const util = require('../utils/index');
const path = require('path');

class AoneLoader {
  constructor(options) {
    this.options = options;
  }
  /**
   * aone 的信息
   */
  get aoneEnv() {
    return util.tryRequire(path.join(this.options.baseDir, 'aoneEnv.json'));
  }
}

module.exports = AoneLoader;
