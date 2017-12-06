/**
 * Loader逻辑,覆盖部分egg loader
 */


// exports.MasterLoader = require('./master_loader');
exports.AppWorkerLoader = require('./app-worker-loader');
exports.AgentWorkerLoader = require('./agent-worker-loader');
