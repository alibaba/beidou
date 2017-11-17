

const path = require('path');

module.exports = {
  keys: 'key',
  isomorphic: {
    universal: {
      assetsFilePath: path.join(__dirname, '../.isomorphic/assets.json'),
      assets: ['.scss', '.png']
    }
  }
};
