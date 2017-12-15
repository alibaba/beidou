const path = require('path');
const egg = require('egg');
// const escapeRegExp = require('lodash/escapeRegExp');
const AppWorkerLoader = require('../loaders/app-worker-loader');

const DEPRECATE = Symbol('BeidouApplication#deprecate');

/**
 * Application
 * @extends Egg.Application
 */
class BeidouApplication extends egg.Application {
  constructor(options) {
    options = options || /* istanbul ignore next */ {};
    super(options);
    this.logger.info('[Beidou App] App Worker started, pid is %s', process.pid);
  }

  get [Symbol.for('egg#eggPath')]() {
    return path.resolve(__dirname, '../../../');
    // return __dirname;
  }

  get [Symbol.for('egg#loader')]() {
    return AppWorkerLoader;
  }

  /**
   * depd API
   * @member {Function}
   * @since 1.1.2
   */
  get beidouDeprecate() {
    if (!this[DEPRECATE]) {
      this[DEPRECATE] = require('depd')('beidou');
    }
    return this[DEPRECATE];
  }

  /*
   * override dumpConfig of egg, do it inside agent
   * @private
   */
  dumpConfig() {

  }
}

module.exports = BeidouApplication;
