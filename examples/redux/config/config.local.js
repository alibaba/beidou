'use strict';

module.exports = function () {
  const exports = {
    react: {
      static: true,
      cache: false,
      beautify: true,
      assetPath: '/build',
    },
    webpack: {
      output: {
        publicPath: '/build/',
      },
    },
  };
  return exports;
};
