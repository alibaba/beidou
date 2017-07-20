'use strict';

const egg = require('egg');
const path = require('path');
const fs = require('fs');
const AgentWorkerLoader = require('../loaders/agent-worker-loader');

/**
 * Agent
 * @extends Egg.Agent
 */
class BeidouAgent extends egg.Agent {
  constructor(options) {
    super(options);

    this.logger.info('[Beidou Worker] Beidou Worker started, pid is %s', process.pid);
  }

  get [Symbol.for('egg#eggPath')]() {
    return path.resolve(__dirname, '../../../');
    // return __dirname;
  }

  get [Symbol.for('egg#loader')]() {
    return AgentWorkerLoader;
  }

  /**
   * 将 app.config 保存到 debug/${type}_config.json
   */
  dumpConfig() {
    const rundir = (this.config && this.config.rundir) || 'run';
    const configdir = path.join(rundir, `${this.type}_${new Date().toString()}_config.json`);
    try {
      fs.existsSync(rundir) || fs.mkdirSync(rundir);
      fs.writeFileSync(configdir, JSON.stringify({
        config: this.config,
        plugins: this.plugins,
      }, null, 2));
    } catch (err) {
      /* istanbul ignore next */
      this.logger.warn(`duplicateConfig error: ${err.message} ${err.stack ? err.stack : ''}`);
    }
  }
}

module.exports = BeidouAgent;
