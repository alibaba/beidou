
module.exports = function () {
  const exports = {};

  exports.webpack = {
    hmr: {
      enable: true,
      path: '/__webpack_hmr'
    }
  };

  exports.keys = 'test';
  return exports;
};
