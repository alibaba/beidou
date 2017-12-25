module.exports = function () {
  const config = {
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
      presets: ['babel-preset-beidou-server'],
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
      cache: false,
    },
  };

  return {
    isomorphic: config,
  };
};
