'use strict';

const path = require('path');
const { getAssetManifest } = require('./lib/utils');

module.exports = (app) => {
  // get asset with hash from cwd/manifes.json;
  if (app.config.view.useHashAsset) {
    if (app.config.env === 'local' || app.config.env === 'unittest') {
      app.coreLogger.warn(
        `Detect view.useHashAsset in ${app.config.env} env, will ignore it.`
      );
      app.assetManifest = {};
      return;
    }
    const hashAssetPath =
      app.config.view.hashAssetPath || path.join(app.baseDir, 'manifest.json');
    app.assetManifest = getAssetManifest(hashAssetPath);
  }
};
