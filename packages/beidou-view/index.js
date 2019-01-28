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
   * cache: true, //optional, if false, clean require cache
   *  for development usage
   * internals: true, //optional, true: renderToString or
   *  false: renderToStaticMarkup
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
    // Load all plugins, frameworks, application 'app/view-middlewares'
    // into object middlewares
    const units = loader.getLoadUnits();
    if (!options.extPaths) {
      options.extPaths = [];
    }
    for (const unit of units.concat(options.extPaths)) {
      new FileLoader({
        directory: path.join(unit.path, 'app/view-middlewares'),
        target: middlewares,
        call: false,
      }).load();
    }

    // Compose user defined middlewares
    this.fn = compose(options.middlewares.map(name => middlewares[name]));
  }

  renderElement() {
    throw new Error('Child class must implement this method');
  }

  renderElementToStream() {
    throw new Error('Child class must implement this method');
  }

  async render(filepath, props) {
    const Component = require(filepath);

    Object.assign(props, {
      renderElement: this.renderElement.bind(this),
      renderElementToStream: this.renderElementToStream.bind(this),
    });

    const context = {
      filepath,
      // when add-module-exports not work
      Component: Component.default || Component,
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
