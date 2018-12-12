'use strict';

const path = require('path');
const register = require('beidou-isomorphic/lib/register');

const DEPRECATE = Symbol('BeidouApplication#deprecate');

module.exports = function (target) {
  /**
   * Application
   * @extends Egg.Application
   */
  class BeidouApplication extends target.Application {
    constructor(options = /* istanbul ignore next */ {}) {
      register(options);
      super(options);
      this.logger.info(
        '[Beidou App] App Worker started, pid is %s',
        process.pid
      );
    }

    get [Symbol.for('egg#eggPath')]() {
      return path.resolve(__dirname, '../../../');
    }

    get [Symbol.for('egg#loader')]() {
      return target.AppWorkerLoader;
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

  target.Application = BeidouApplication;
};
