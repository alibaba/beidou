'use strict';

const { getAssetManifest } = require('./lib/utils');

module.exports = (app) => {
  // get asset with hash from cwd/manifes.json;
  if (app.config.view.useHashAsset) {
    if (app.config.env === 'local') {
      app.coreLogger.warn(
        'Detect view.useHashAsset in local env, will ignore it.'
      );
      app.config.view.useHashAsset = false;
      return;
    }
    app.assetManifest = getAssetManifest(app.baseDir);
  }
};
