'use strict';

const path = require('path');
const fs = require('fs');
const Module = require('module');
const resolveAlias = require('./alias');

function requireAssetsJson(filepath, logger) {
  let json = {};
  if (fs.existsSync(filepath)) {
    try {
      json = require(filepath);
    } catch (e) {
      // warning
      logger.warn(
        'invalid assets file at: %s, assets file was created automaticly by Isomorphic plugin,' +
          'never edit it manually',
        filepath
      );
      return json;
    }
  }
  return json;
}

function createIsomorphicRequire(baseDir, universal, logger) {
  // let json = requireAssetsJson(universal.assetsFilePath, logger);
  return function (module, filename) {
    const relativePath = path.relative(baseDir, filename);
    if (!universal.cache) {
      delete Module._cache[filename];
      delete Module._cache[universal.assetsFilePath];
    }
    const json = requireAssetsJson(universal.assetsFilePath, logger);
    module.exports = json[relativePath];
  };
}

function isValidExt(ext) {
  return /\.[0-9a-zA-A]+/.test(ext);
}

module.exports = function (app) {
  const isomorphic = app.config.isomorphic;
  const baseDir = app.config.baseDir;

  const logger = app.logger;

  if (isomorphic.alias) {
    const alias = isomorphic.alias;
    if (alias && Object.keys(alias).length > 0) {
      app.logger.info(
        '[beidou:plugin:isomorphic] isomorphic.alias detected: %o',
        alias
      );
      resolveAlias(alias);
    }
  }

  if (isomorphic.universal) {
    const universal = Object.assign(
      {
        context: baseDir,
        assetsFilePath: path.join(baseDir, '.isomorphic/assets.json'),
        cache: __DEV__ === false,
      },
      isomorphic.universal
    );

    const assets = universal.assets;
    const isomorphicRequire = createIsomorphicRequire(
      baseDir,
      universal,
      logger
    );
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
