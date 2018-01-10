'use strict';

const Rax = require('rax');
const raxRender = require('rax-server-renderer');
const debug = require('debug')('beidou:rax');

module.exports = class RaxView {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.logger = ctx.app.coreLogger;
  }

  /**
   * Render from filePath and set result to ctx.body
   * @param {String} filePath
   */
  * render(filePath) {
    const rsp = yield this.renderView(filePath);
    this.ctx.body = rsp;
    return rsp;
  }

  /**
   * Render from filePath
   * @param {String} filePath
   */
  * renderView(filePath) {
    debug(`File path: ${filePath}`);
    const tpl = require(filePath);
    debug(`temple: ${tpl.toString()}`);
    return raxRender.renderToString(Rax.createElement(tpl.default || tpl));
  }

  /**
   * Render from file string.
   */
  * renderString() {
    return new Promise((resolve, reject) => {
      this.logger.info('[beidou-plugin-rax] renderString reject');
      const err = new Error();
      err.name = 'not implemented yet!';
      err.status = 200;
      reject(err);
    });
  }
};
