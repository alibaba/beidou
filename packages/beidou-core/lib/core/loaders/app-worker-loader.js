'use strict';

const path = require('path');

module.exports = function (target) {
  /**
   * App Worker 进程的 Loader，继承 Egg.AppWorkerLoader
   * @extends Egg.AppWorkerLoader
   */
  class BeidouAppWorkerLoader extends target.AppWorkerLoader {
    constructor(options) {
      super(options);

      // 使用 egg 提供的 console, 能够统一控制日志输出级别
      this.logger =
        options.logger ||
        /* istanbul ignore next */ options.console ||
        /* istanbul ignore next */ console;

      this.logger.info(
        '[Beidou Loader] Beidou Loader started, pid is %s',
        process.pid
      );
    }

    /**
     * custom loadRouter
     * @method EggLoader#loadRouter
     */
    loadRouter() {
      super.loadRouter();
      this.loadCustomRouter();
    }

    loadCustomRouter() {
      this.getLoadUnits().forEach(unit =>
        this.loadFile(path.join(unit.path, 'app/extend/router.js'))
      );
    }

    // /**
    //  * custom loadConfig
    //  * @method EggLoader#loadConfig
    //  */
    // loadConfig() {
    //   super.loadConfig();
    // }
  }

  target.AppWorkerLoader = BeidouAppWorkerLoader;
};
