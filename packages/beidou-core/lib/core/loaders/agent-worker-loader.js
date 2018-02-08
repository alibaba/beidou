'use strict';

const path = require('path');

module.exports = function (target) {
  /**
   * Agent Worker 进程的 Loader，继承 Egg.AgentWorkerLoader
   * @extends Egg.AgentWorkerLoader
   */
  class BeidouAgentWorkerLoader extends target.AgentWorkerLoader {
  // constructor(options) {
  //   super(options);
  // }

    loadConfig() {
      super.loadConfig();
      this.checkDevPlugins();
    }


    /**
    * 检测开发态插件，目前egg约束所有插件都必须放到dependencies里
    */
    checkDevPlugins() {
      const appPkg = require(path.join(this.options.baseDir, './package.json'));
      Object.keys(this.plugins).forEach((key) => {
        const plugin = this.plugins[key];
        const name = plugin.package || plugin.name;
        if (appPkg.devDependencies && appPkg.devDependencies[name]) {
          throw new Error(`plugin ${name} can not be in devDependencies`);
        }
      });
    }
  }

  target.AgentWorkerLoader = BeidouAgentWorkerLoader;
};
