'use strict';

const Rax = require('rax');
const { renderToString } = require('rax-server-renderer');
const debug = require('debug')('beidou:rax');
const reduxLib = require('./redux');
const partialLib = require('./partial');
const beautifyLib = require('./beautify');

class RaxView {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.logger = ctx.app.coreLogger;
    this.config = ctx.app.config.rax;
  }

  /**
   * Render from filePath and set result to ctx.body
   * @param {String} filePath
   */
  async render(filePath, locals) {
    const rsp = await this.renderView(filePath, locals);
    this.ctx.body = rsp;
    return rsp;
  }

  /**
   * Render from filePath
   * @param {String} filePath
   * @param locals - custom props in `this.render(<view>, props)`
   * in controller
   */
  async renderView(filePath, locals) {
    debug(`File path: ${filePath}`);
    const comp = require(filePath);
    debug(`temple: ${comp.toString()}`);

    let props = { ...locals };
    const reduxProps = await reduxLib(comp, props);
    props = { ...props, ...reduxProps };
    const partialProps = await partialLib(comp, props, renderToString);
    props = { ...props, ...partialProps };

    const htmlStr =
      this.config.doctype +
      renderToString(Rax.createElement(comp.default || comp, props));

    return beautifyLib(htmlStr);
  }

  /**
   * Render from file string.
   */
  async renderString() {
    return new Promise((resolve, reject) => {
      this.logger.info('[beidou-plugin-rax] renderString reject');
      const err = new Error();
      err.name = 'not implemented yet!';
      err.status = 200;
      reject(err);
    });
  }
}

module.exports = RaxView;
