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
      config: path.join(app.baseDir, 'webpack.config.js'),
      output: {
        publicPath: '/build',
      },
    },
  };
  return exports;
};
