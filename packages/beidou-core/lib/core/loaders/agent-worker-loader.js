const path = require('path');
const egg = require('egg');

/**
 * Agent Worker Loader, extend Egg.AgentWorkerLoader
 * @extends Egg.AgentWorkerLoader
 */
class BeidouAgentWorkerLoader extends egg.AgentWorkerLoader {
  // constructor(options) {
  //   super(options);
  // }

  loadConfig() {
    super.loadConfig();
    this.checkDevPlugins();
  }


  /**
  * check plugins, all plugins must be installed in dependency
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

module.exports = BeidouAgentWorkerLoader;
