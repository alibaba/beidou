
module.exports = function () {
  const config = {
    /**
     * JSDom polyfill, simulate browser environment in server
     * true by defalut
     *
     * if an `Object` provided, we merge it into `global` use `lodash.merge`
     */
    polyfill: true,
    /**
     * babel register, enabled by defalut, set `false` to disable
     *
     * all configs below will be passed into `require('babel-register')(configs)`
     *
     * for more details, see: https://babeljs.io/docs/usage/babel-register/
     */
    babel: {
      /**
       * presets of beidou, or you can choose any else you like
       */
      presets: ['beidou-server'],
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
      // extensions: ['.es6', '.es', '.jsx', '.js', '.mjs'],

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
     * }
     */

    universal: false,
  };

  return {
    isomorphic: config,
  };
};
