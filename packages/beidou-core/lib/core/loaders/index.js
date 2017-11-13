/**
 * Loader逻辑,覆盖部分egg loader
 */


// exports.BaseLoader = require('./aone-loader');
// exports.MasterLoader = require('./master_loader');
exports.AoneLoader = require('./aone-loader');
exports.AppWorkerLoader = require('./app-worker-loader');
exports.AgentWorkerLoader = require('./agent-worker-loader');
