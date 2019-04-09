'use strict';

const { concatUrl, normalizeUrl } = require('../../lib/utils');

const helper = {
  /**
   * @param {String} filename asset file name
   * @param {Object} config asset config
   */
  [Symbol.for('beidou#asset')](filename, config) {
    if (this.app.config.view.useHashAsset && this.app.assetManifest[filename]) {
      filename = this.app.assetManifest[filename];
    }
    const assetHost = config.host || config.assetHost;
    const { assetPath } = config;
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
