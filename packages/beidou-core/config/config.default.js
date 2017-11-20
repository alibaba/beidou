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

    /**
     * root directory for auto match route
     * include server route and webpack entry
     * @member {String} Config#routeMatchRoot
     * @since 1.0.0
     */
    routeMatchRoot: '/',

    /**
     * files or directories should be ingored
     * when automatically match route
     * @member {String} Config#routeMatchExclude
     * @since 1.0.0
     */
    routeMatchExclude: '_*',

    /**
     * files should be ignored when require
     * in server render process
     * @member {Array} Config#requireIgnore
     * @since 1.0.0
     */
    requireIgnore: [
      '.css',
      '.scss',
      '.sass',
      '.pcss',
      '.stylus',
      '.styl',
      '.less',
      '.sss',
      '.gif',
      '.jpeg',
      '.jpg',
      '.png',
      '.svg',
      '.mp4',
      '.webm',
      '.ogv',
    ],
  };

  /**
   * Framework config
   * @member {Object} Config#core
   * @property {String} name - framework name(eg. Name)，default to Egg
   */
  exports.core = {
    name: 'Beidou',
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

  /**
   * framework babel config
   */
  exports.babel = {
    enable: true, // default set to enable
    options: {
      presets: ['beidou-server'],
      // babelrc: false,
      // ignore: /regex/,
      // ignore: ['*.scss'],
      // Ignore can also be specified as a function.
      // ignore(filename) {
      //   const ext = path.parse(filename).ext;
      //   if ([
      //     '.css',
      //     '.scss',
      //     '.sass',
      //     '.pcss',
      //     '.stylus',
      //     '.styl',
      //     '.less',
      //     '.sss',
      //     '.gif',
      //     '.jpeg',
      //     '.jpg',
      //     '.png',
      //     '.svg',
      //     '.mp4',
      //     '.webm',
      //     '.ogv',
      //   ].indexOf(ext) !== -1) {
      //     console.log('----------------------');
      //     return true;
      //   }
      //   return false;
      // },

      // Optional only regex - if any filenames **don't** match this regex then they
      // aren't compiled
      // only: /my_es6_folder/,

      // Setting this will remove the currently hooked extensions of `.es6`, `.es`, `.jsx`, `.mjs`
      // and .js so you'll have to add them back if you want them to be used again.
      // extensions: ['.es6', '.es', '.jsx', '.js', '.mjs'],

      // Setting this to false will disable the cache.
      cache: true,
    },
  };

  return exports;
};
