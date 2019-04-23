'use strict';
const fs = require('fs');
const path = require('path');
const is = require('is');
const BeidouView = require('../../lib/beidou');
const symbol = Symbol.for('beidou#renderView');
module.exports = {
  [symbol]: null,
  async ssr(filepath, props) {
    let beidou = null;
    const { beidou: option } = this.app.config;
    if (this[symbol]) {
      beidou = null;
    } else {
      beidou = new BeidouView(this);
    }
    let pathArr = [ filepath, path.join(option.view || this.app.baseDir, filepath) ];
    if (is.function(this.remoteAsset)) {
      pathArr.push(await this.remoteAsset(filepath));
    }

    if (option.extensions && is.array(option.extensions)) {
      const pathArrExt = [];

      pathArr.forEach(v => {
        option.extensions.forEach(
          ext => {
            pathArrExt.push(v + ext);
          }
        );
      });
      pathArr = pathArr.concat(pathArrExt);
    }
    const p = pathArr.find(
      v => {
        return fs.existsSync(v);
      }
    );
    try {
      if (!p) {
        throw new Error(`${filepath} is not exsit, please check it`);
      }
      const res = await beidou.render(p, {
        ...props,
        ctx: this,
      });
      return res;
    } catch (e) {
      this.coreLogger.warn(`SSRError: render ${filepath} occur exception !`, e);
      if (option.onError) {
        return await option.onError.call(this, e);
      }
      throw e;
    }
  },
};
