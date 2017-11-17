const path = require('path');

module.exports = function (app) {
  const exports = {
    react: {
      intervals: true,
      cache: false,
      beautify: true,
    },
    webpack: {
      config: path.join(app.baseDir, 'webpack.config.js'),
      publicPath: '/build',
      hmr: {
        enable: true,
        path: '/__webpack_hmr'
      }
    }
  };
  return exports;
};
