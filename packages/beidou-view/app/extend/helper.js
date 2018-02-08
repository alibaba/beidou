'use strict';

const { concatUrl, normalizeUrl } = require('../../lib/utils');

const helper = {
  /**
   * @param {*} filename asset file name
   */
  [Symbol.for('#beidou.asset')](filename, config) {
    const assetHost = config.host || config.assetHost;
    const assetPath = config.assetPath;

    if (!assetHost) {
      return concatUrl(assetPath, filename);
    }

    if (/^(http:|https:)?\/\//i.test(assetHost)) {
      return concatUrl(assetHost, assetPath, filename);
    }

    return normalizeUrl(
      `${this.ctx.protocol}://${concatUrl(assetHost, assetPath, filename)}`
    );
  },
};

module.exports = helper;
