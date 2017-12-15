'use strict'; // eslint-disable-line

module.exports = function () {
  const exports = {
    react: {
      intervals: true,
      cache: false,
      beautify: true,
    },
    webpack: {
      // hmr: {
      //   path: '__webpack_hmr',
      // }
    },
  };
  return exports;
};
