const path = require('path');

module.exports = (appInfo) => {
  const exports = {
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
     * The directory of server running. You can find `application_config.json` under it that is dumpped from `app.config`.
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
  };

  /**
   * Framework config
   * @member {Object} Config#core
   * @property {String} name - framework name(eg. Name)，default to Egg
   */
  exports.core = {
    name: 'Beidou',
  };

  exports.route = {
    /**
     * root directory for auto match route
     * include server route and webpack entry
     * @member {String} Config#root
     * @since 1.0.0
     */
    root: '/',

    /**
     * files or directories should be ingored
     * when automatically match route
     * @member {String} Config#exclude
     * @since 1.0.0
     */
    exclude: '_*',

    entry: 'index',
  };
  /**
   * core enable middlewares, which will map to app.middlewares.x
   * @member {Array} Config#middleware
   */
  exports.coreMiddleware = [
    'meta',
    'siteFile',
    'notfound',
    'bodyParser',
    'overrideMethod',
  ];

  return exports;
};
