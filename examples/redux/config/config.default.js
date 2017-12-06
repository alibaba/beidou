

const path = require('path');

module.exports = {
  keys: 'key',
  isomorphic: {
    babel: {
      plugins: ['add-module-exports', 'react-hot-loader/babel'],
    },
    universal: {
      assetsFilePath: path.join(__dirname, '../.isomorphic/assets.json'),
      assets: ['.scss', '.png'],
    },
  },
};
