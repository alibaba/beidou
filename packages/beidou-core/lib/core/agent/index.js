const egg = require('egg');
const path = require('path');
const AgentWorkerLoader = require('../loaders/agent-worker-loader');

/**
 * Agent
 * @extends Egg.Agent
 */
class BeidouAgent extends egg.Agent {
  constructor(options) {
    super(options);

    this.logger.info(
      '[Beidou Agent] Beidou Agent started, pid is %s',
      process.pid
    );
  }

  get [Symbol.for('egg#eggPath')]() {
    return path.resolve(__dirname, '../../../');
    // return __dirname;
  }

  get [Symbol.for('egg#loader')]() {
    return AgentWorkerLoader;
  }
}

module.exports = BeidouAgent;
