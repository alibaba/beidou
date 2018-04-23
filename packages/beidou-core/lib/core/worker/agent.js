'use strict';

const path = require('path');

const DEPRECATE = Symbol('BeidouApplication#deprecate');

module.exports = function (target) {
  /**
   * Agent
   * @extends Egg.Agent
   */
  class BeidouAgent extends target.Agent {
    constructor(options) {
      super(options);
      this.logger.info(
        '[Beidou Worker] Beidou Worker started, pid is %s',
        process.pid
      );
    }

    get [Symbol.for('egg#eggPath')]() {
      return path.resolve(__dirname, '../../../');
    }

    get [Symbol.for('egg#loader')]() {
      return target.AgentWorkerLoader;
    }

    /**
     * depd API
     * @member {Function}
     * @since 1.0.0
     */
    get beidouDeprecate() {
      if (!this[DEPRECATE]) {
        this[DEPRECATE] = require('depd')('beidou');
      }
      return this[DEPRECATE];
    }
  }

  target.Agent = BeidouAgent;
};
