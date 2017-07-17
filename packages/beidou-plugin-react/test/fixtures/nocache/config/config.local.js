var path = require('path');

module.exports = function (antx) {
  const exports = {
    react: {
      cache: false,
      internals: false,
    },
    view: {
      cache: false
    }
  };
  return exports;
}
