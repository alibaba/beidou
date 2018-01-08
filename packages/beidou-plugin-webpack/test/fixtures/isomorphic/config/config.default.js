'use strict';

const path = require('path');

module.exports = function (app) {
  const exports = {};

  exports.webpack = {
    config: path.resolve(__dirname, '../webpack/custom.webpack.config.js'),
    outputPath: './output/'
  };

  exports.isomorphic = {
    universal: {
      assetsFilePath: path.join(__dirname, '../output/assets.json'),
      assets: ['.scss', {
        ext: '.png',
        include: 'bg.png',
      }]
    }
  };

  return exports;
};
