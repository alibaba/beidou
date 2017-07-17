var path = require('path');

module.exports = function (antx) {
  const exports = {
    isomorphic: {
      webpackAlias: {
        client: path.join(__dirname, '../client'), 
      },
      match: /\/render-polyfill/
    }
  };
  return exports;
}
