'use strict';

module.exports = function (appInfo) {
  const exports = {
    keys: 'test',
    view: {
      root: `${appInfo.baseDir}/app/views`,
    },
    react: {
      static: true,
    },
  };
  return exports;
};
