const path = require('path');

module.exports = appInfo => ({
  view: {
    useHashAsset: false,
    hashAssetPath: path.join(appInfo.baseDir, '.manifest.json'),
  },
});
