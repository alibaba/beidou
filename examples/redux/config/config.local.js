const path = require('path');

module.exports = function (app) {
  const exports = {
    react: {
      static: true,
      cache: false,
      beautify: true,
      assetPath: '/build',
    },
    webpack: {
      publicPath: '/build/',
      hmr: {
        // reload: true
      },
    },
  };
  return exports;
};
