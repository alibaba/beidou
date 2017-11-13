

const path = require('path');
const egg = require('egg');
// const escapeRegExp = require('lodash/escapeRegExp');
const AppWorkerLoader = require('../loaders/app-worker-loader');

const DEPRECATE = Symbol('BeidouApplication#deprecate');

/**
 * App 对象，由 AppWorker 实例化
 * @extends Egg.Application
 */
class BeidouApplication extends egg.Application {
  constructor(options) {
    require('babel-register')();
    options = options || /* istanbul ignore next */ {};
    super(options);
    if (this.config.requireIgnore) {
      const noop = function () {};
      for (const ext of this.config.requireIgnore) {
        require.extensions[ext] = noop;
      }
    }
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
   * 统一的 depd API
   * @member {Function}
   * @since 1.1.2
   */
  get beidouDeprecate() {
    if (!this[DEPRECATE]) {
      // 延迟加载，这样允许单元测试通过 process.env.NO_DEPRECATION = '*' 设置不输出
      this[DEPRECATE] = require('depd')('beidou');
    }
    return this[DEPRECATE];
  }

  /*
   * 覆盖egg的dumpConfig, 统一放到agent处理,避免每个worker都反复写入
   * @private
   */
  dumpConfig() {

  }
}

module.exports = BeidouApplication;
