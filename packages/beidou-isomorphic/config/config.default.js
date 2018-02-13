'use strict';

const path = require('path');

module.exports = function (appInfo) {
  const config = {
    /**
     * JSDom polyfill, simulate browser environment in server
     * true by default
     *
     * if an `Object` provided, we merge it into `global` use `lodash.merge`
     */
    polyfill: true,

    /**
     * babel register, enabled by default, set `false` to disable
     *
     * all configs below will be passed into `require('babel-register')(configs)`
     *
     * for more details, see: https://babeljs.io/docs/usage/babel-register/
     */
    babel: {
      /**
       * presets of beidou, or you can choose any else you like
       */
      presets: ['babel-preset-beidou-server'].map(require.resolve),
      // plugins: ['add-module-exports'],
      babelrc: false,
      // ignore: /regex/,
      // ignore: ['*.scss'],
      // Ignore can also be specified as a function.
      // ignore(filename) {
      //   return false;
      // },
      // Optional only regex - if any filenames **don't** match this regex then they
      // aren't compiled
      // only: /my_es6_folder/,

      // Setting this will remove the currently hooked extensions of `.es6`, `.es`, `.jsx`, `.mjs`
      // and .js so you'll have to add them back if you want them to be used again.
      extensions: ['.es6', '.es', '.js', '.jsx', '.mjs'],

      // Setting this to false will disable the cache.
      cache: true,
    },

    /**
     * false by default
     *
     * the universal field provides configuration both for `plugin-isomorphic` and `plugin-webpack`
     * for `plugin-webpack`:
     *   write assets.json file into `assetsFilePath`
     *   only contains assets type defined by `assets` array
     * for `plugin-isomorphic`:
     *   read file defined by `assetsFilePath`
     *   hook require and return content in assets.json if file path matches in `assets`
     *
     * universal: {
     *  context: app.baseDir, // webpack context
     *  assetsFilePath: '', // path for asset file write into
     *  memoryFs: false, // TODO: use `memory-fs` in dev
     *  assets: [{
     *    ext: '.scss',
     *    exclude: 'node_modules'
     *  }],
     *  cache: true,
     * }
     */

    universal: false,

    alias: {
      client: path.join(appInfo.baseDir, 'client'),
    },
  };

  return {
    isomorphic: config,
  };
};
