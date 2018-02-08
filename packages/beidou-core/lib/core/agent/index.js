const path = require('path');

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
  }

  target.Agent = BeidouAgent;
};
