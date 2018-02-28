'use strict';

module.exports = function (appInfo) {
  const exports = {
    react: {
      beautify: true,
      assetHost: '//test.cdn.com',
      assetPath: '/version',
    },
  };
  return exports;
};
