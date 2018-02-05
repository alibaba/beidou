'use strict';

const path = require('path');
const egg = require('egg');

/**
 * Agent Worker Loader, extend Egg.AgentWorkerLoader
 * @extends Egg.AgentWorkerLoader
 */
class BeidouAgentWorkerLoader extends egg.AgentWorkerLoader {
  loadConfig() {
    super.loadConfig();
    this.checkDevPlugins();
  }

  /**
   * check plugins, all plugins must be installed in dependency
   */
  checkDevPlugins() {
    const appPkg = require(path.join(this.options.baseDir, './package.json'));
    for (const key of Object.keys(this.plugins)) {
      const plugin = this.plugins[key];
      const name = plugin.package || plugin.name;
      if (appPkg.devDependencies && appPkg.devDependencies[name]) {
        throw new Error(`plugin ${name} can not be in devDependencies`);
      }
    }
  }
}

module.exports = BeidouAgentWorkerLoader;
