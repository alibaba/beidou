'use strict';

const path = require('path');
const fs = require('fs');


function requireAssetsJson(filepath, logger) {
  let json = {};
  if (fs.existsSync(filepath)) {
    try {
      json = require(filepath);
    } catch (e) {
      // warning
      logger.warn('invalid assets file at: %s, assets file was created automaticly by Isomorphic plugin,' +
       'never edit it manunly', filepath);
      return json;
    }
  }
  return json;
}

function createIsomorphicRequire(baseDir, universal, logger) {
  let json = requireAssetsJson(universal.assetsFilePath, logger);
  return function (module, filename) {
    const relativePath = path.relative(baseDir, filename);
    if (__DEV__) {
      delete require.cache[filename];
      delete require.cache[universal.assetsFilePath];
      json = requireAssetsJson(universal.assetsFilePath, logger);
    }
    module.exports = json[relativePath];
  };
}

function isValidExt(ext) {
  return /\.[0-9a-zA-A]+/.test(ext);
}

module.exports = function (app) {
  const isomorphic = app.config.isomorphic;
  const baseDir = app.config.baseDir;
  const universal = isomorphic.universal;

  const logger = app.logger;
  if (universal) {
    if (!universal.context) {
      universal.context = app.config.baseDir;
    }
    const assets = universal.assets;
    const isomorphicRequire = createIsomorphicRequire(baseDir, universal, logger);
    for (const asset of assets) {
      let ext = null;
      if (typeof asset === 'string' && isValidExt(asset)) {
        ext = asset;
      }
      if (typeof asset === 'object' && asset.ext && isValidExt(asset.ext)) {
        ext = asset.ext;
      }
      require.extensions[ext] = isomorphicRequire;
    }
  }
};
