

const path = require('path');

module.exports = function () {
  const exports = {
    /**
     * webpack config
     * @member {Object} Config#webpack.config
     */
    webpack: {
      defaultConfig: path.resolve(__dirname, '../webpack/webpack.config.dev.js'),
    },
  };

  return exports;
};
