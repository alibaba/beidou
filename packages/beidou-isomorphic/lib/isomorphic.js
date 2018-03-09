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
        'invalid assets file at: %s, assets file was created automatically ' +
          'by Isomorphic plugin, never edit it manually',
        filepath
      );
      return json;
    }
  }
  return json;
}

function createIsomorphicRequire(baseDir, universal, logger) {
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
  return /\.[0-9a-zA-Z]+/.test(ext);
}

module.exports = function (app) {
  const { isomorphic, baseDir } = app.config;
  const { logger } = app;
  const { alias } = isomorphic;

  if (alias) {
    if (alias && Object.keys(alias).length > 0) {
      app.logger.info(
        '[beidou:isomorphic] isomorphic.alias detected: %o',
        alias
      );
      resolveAlias(alias);
    }
  }

  if (isomorphic.universal) {
    const universal = Object.assign(
      {
        // Set default value here as __DEV__ can't access in config dir
        cache: __DEV__ === false,
      },
      isomorphic.universal
    );

    const { assets } = universal;
    const isomorphicRequire = createIsomorphicRequire(
      baseDir,
      universal,
      logger
    );
    for (const asset of assets) {
      let ext = null;
      if (typeof asset === 'string' && isValidExt(asset)) {
        ext = asset;
      } else if (
        typeof asset === 'object' &&
        asset.ext &&
        isValidExt(asset.ext)
      ) {
        /* eslint-disable prefer-destructuring */
        ext = asset.ext;
      } else {
        logger.error(
          `Expect asset type string or object
          （e.g. ['.scss'], [{ext:'scss'}]）, get ${asset}`
        );
      }
      require.extensions[ext] = isomorphicRequire;
    }
  }
};
