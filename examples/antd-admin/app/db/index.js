/**
 * Disk Based JSON Database
 * Only for demo usage.
 * egg-sequelize is recommended in real word scenarios
 * see. https://github.com/eggjs/egg-sequelize
 */
const path = require('path');
const db = require('diskdb');

module.exports = db.connect(
  path.join(__dirname, 'files'),
  ['user', 'dashboard']
);
