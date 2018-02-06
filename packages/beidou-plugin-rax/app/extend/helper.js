'use strict';

const normalizeUrl = require('normalizeurl');

function concatUrl(...pathes) {
  const result = pathes.reduce((pre, next) => {
    if (!pre) return next;
    let slash = 0;
    next[0] === '/' && (slash += 1);
    pre.charAt(pre.length - 1) === '/' && (slash += 1);
    if (slash === 2) {
      return pre + next.substr(1);
    } else if (slash === 1) {
      return pre + next;
    }
    return `${pre}/${next}`;
  });

  return normalizeUrl(result);
}

exports.normalizeUrl = normalizeUrl;

const helper = {
  /**
   * generate asset url, concat with host and path defined in `config.react`
   * @param {*} filename asset file name
   */
  asset(filename) {
    const config = this.config.rax;
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
