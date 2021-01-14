'use strict';

const ReactDOMServer = require('react-dom/server');
const path = require('path');
const BaseView = require('beidou-view');

class BeidouView extends BaseView {
  constructor(ctx) {
    const options = ctx.app.config.beidou;
    let extPaths = [
      {
        path: path.join(require.resolve('beidou-view'), '../'),
      },
    ];
    if (options.extPaths) {
      extPaths = extPaths.concat(options.extPaths);
    }

    super(
      ctx,
      Object.assign({}, options, {
        extPaths,
      })
    );
  }

  async render(...args) {
    this.ctx.type = 'html';
    if (this.options.cache === false) {
      this.clearCache(args[0]);
    }
    const res = await super.render(...args);
    return res;
  }

  renderElementToStream(component, props = {}) {
    if (this.options.static) {
      return ReactDOMServer.renderToStaticNodeStream(component, props);
    }
    return ReactDOMServer.renderToNodeStream(component, props);
  }

  renderElement(component, props = {}) {
    if (this.options.static) {
      return ReactDOMServer.renderToStaticMarkup(component, props);
    }
    return ReactDOMServer.renderToString(component, props);
  }

  clearCache(filepath) {
    const absolutePath = path.resolve(filepath);
    if (require.cache[absolutePath]) {
      delete require.cache[absolutePath];
    }
  }
}

module.exports = BeidouView;
