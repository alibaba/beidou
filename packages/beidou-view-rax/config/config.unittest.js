'use strict';

const path = require('path');

module.exports = () => ({
  view: {
    cache: false,
  },
  router: {
    /**
     * root directory for auto match route
     * include server route and webpack entry
     * @member {String} Config#root
     * @since 1.0.0
     */
    root: '/',

    urlPrefix: '/',

    /**
     * files or directories should be ignored
     * when automatically match route
     * @member {String} Config#exclude glob pattern
     * @since 1.0.0
     */
    exclude: '_*',

    /**
     * define custom mapping files to router
     *
     * {
     *  user: {
     *    profile: 'get',
     *    create: 'post',
     *  }
     * }
     */
    mapping: null,

    /**
     * if entry defined, router only works when name of files match `entry`.
     */
    entry: null,
  },
  isomorphic: {
    babel: {
      ignore(filename) {
        const testDirs = [path.resolve(__dirname, '../test/fixtures')];
        for (const dir of testDirs) {
          if (filename.includes(dir)) {
            return false;
          }
        }

        return true;
      },
    },
  },
});
