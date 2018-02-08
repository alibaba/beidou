'use strict';

const { concatUrl, normalizeUrl } = require('../../lib/utils');

const helper = {
  /**
   * generate asset url, concat with host and path defined in `config.react`
   * @param {*} filename asset file name
   */
  asset(filename) {
    const config = this.config.react;
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

helper.resolveResource = helper.asset;

module.exports = helper;
