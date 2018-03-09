'use strict';

const path = require('path');

module.exports = appInfo => ({
  /**
   * current environment
   * @member {String} Config#env
   * @since 1.0.0
   */
  env: appInfo.env,

  /**
   * application name
   * @member {String} Config#name
   * @since 1.0.0
   */
  name: appInfo['app.name'],

  /**
   * The directory of server running.
   * You can find `application_config.json`
   * under it that is dumpped from `app.config`.
   * @member {String} Config#rundir
   * @default
   * @since 1.0.0
   */
  rundir: path.join(appInfo.baseDir, 'run'),

  /**
   * source code of isomorphic application
   * @member {String} Config#client
   * @since 1.0.0
   */
  client: path.join(appInfo.baseDir, 'client'),

  /**
   * Framework config
   * @member {Object} Config#core
   * @property {String} name - framework name(eg. Name)，default to Beidou
   */
  core: {
    name: 'Beidou',
  },

  /**
   * core enable middlewares, which will map to app.middlewares.x
   * @member {Array} Config#middleware
   */
  coreMiddleware: [
    'meta',
    'siteFile',
    'notfound',
    'bodyParser',
    'overrideMethod',
  ],
});
