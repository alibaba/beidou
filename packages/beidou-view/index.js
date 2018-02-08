'use strict';

const path = require('path');
const compose = require('koa-compose');

/**
 * Beidou base view, must init after viewEngine initialized
 */
class BeidouBaseView {
  /**
   * @param ctx - beidou ctx
   * @param options - view sub plugin config, example
   * beautify: false // optional, beautify HTML snippet
   * cache: true, //optional, if false, clean require cache for development usage
   * internals: true, //optional, true: renderToString or false: renderToStaticMarkup
   * doctype: '<!DOCTYPE html>', //optional, HTML doctype
   */
  constructor(ctx, options) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.options = options;
    this.config = this.app.config;

    const { loader } = this.app;
    const { FileLoader } = loader;
    const middlewares = {};
    for (const unit of loader.getLoadUnits()) {
      new FileLoader({
        directory: path.join(unit.path, 'app/view-middlewares'),
        target: middlewares,
        call: false,
      }).load();
    }

    this.fn = compose(options.middlewares.map(name => middlewares[name]));
  }

  renderElement() {
    throw new Error('Child class must implement this method');
  }

  async render(filepath, props) {
    const Component = require(filepath);
    const context = {
      filepath,
      Component: Component.default || Component, // when add-module-exports not work
      props,
      html: '',
      view: this,
      config: this.config,
      options: this.options,
    };

    await this.fn(context);
    const htmlStr = context.html;

    return htmlStr;
  }
}

module.exports = BeidouBaseView;
