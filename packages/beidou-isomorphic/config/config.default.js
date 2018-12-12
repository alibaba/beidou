'use strict';

const path = require('path');

module.exports = appInfo => ({
  isomorphic: {
    /**
     * JSDom polyfill, simulate browser environment in server
     * true by default
     *
     * if an `Object` provided, we merge it into `global` use `lodash.merge`
     */
    polyfill: true,

    // /**
    //  * babel register, enabled by default, set `false` to disable
    //  *
    //  * all configs below will be passed into
    //  * `require('babel-register')(configs)`
    //  *
    //  * for more details, see: https://babeljs.io/docs/usage/babel-register/
    //  */
    // babel: {
    //   /**
    //    * presets of beidou, or you can choose any else you like
    //    */
    //   presets: ['babel-preset-beidou-server'].map(require.resolve),
    //   // plugins: ['add-module-exports'],
    //   babelrc: false,
    //   // ignore: /regex/,
    //   // ignore: ['*.scss'],
    //   // Ignore can also be specified as a function.
    //   // ignore(filename) {
    //   //   return false;
    //   // },
    //   // Optional only regex - if any filenames
    //   // **don't** match this regex then they
    //   // aren't compiled
    //   // only: /my_es6_folder/,

    //   // Setting this will remove the currently hooked extensions
    //   // of `.jsx`, `.mjs`
    //   // and .js so you'll have to add them back if you want them
    //   // to be used again.
    //   extensions: ['.es6', '.es', '.jsx', '.js', '.mjs'],

    //   // Setting this to false will disable the cache.
    //   cache: true,
    // },

    /**
     * the universal field provides configuration both for
     * `beidou-isomorphic` and `beidou-webpack`
     * for `beidou-webpack`:
     *   write assets.json file into `assetsFilePath`
     *   only contains assets type defined by `assets` array
     * for `beidou-isomorphic`:
     *   read file defined by `assetsFilePath`
     *   hook require and return content in assets.json if file
     * path matches in `assets`
     *
     */

    universal: {
      // path for asset file write into
      assetsFilePath: path.join(appInfo.baseDir, '.isomorphic/assets.json'),
      // memoryFs: false, // TODO: use `memory-fs` in dev

      /**
       * @property {Array} - asset extension string array, example:
       * ['scss', 'png'], default value is webpack support extensions
       */
      assets: [
        '.sass',
        '.scss',
        '.less',
        '.css',
        '.bmp',
        '.gif',
        '.jpg',
        '.jpeg',
        '.png',
        '.webp',
        '.ico',
        '.woff',
        '.woff2',
        '.svg',
        '.svgz',
        '.otf',
        '.tif',
        '.tiff',
        '.ttf',
        '.eot',
        '.mid',
        '.midi',
      ],
      // cache: true,
    },

    alias: {
      client: path.join(appInfo.baseDir, 'client'),
    },
  },
});
