'use strict';

const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const path = require('path');

const viewPaths = [
  path.join(__dirname, '../../beidou-view'),
  path.join(require.resolve('beidou-view'), '../'),
];
const viewPath = viewPaths.find(p => fs.existsSync(p));
const BaseView = require(viewPath);

class BeidouView extends BaseView {
  constructor(ctx) {
    const options = ctx.app.config.beidou;
    let extPaths = [
      {
        path: viewPath,
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
    const res = await super.render(...args);
    return res;
  }

  async renderString() {
    this.app.logger.info('reject');
    const err = new Error();
    err.name = 'not implemented yet!';
    err.status = 500;
    throw err;
  }

  renderElementToStream(component, props = {}) {
    if (this.options.static) {
      return ReactDOMServer.renderToStaticNodeStream(component, props);
    } else {
      return ReactDOMServer.renderToNodeStream(component, props);
    }
  }

  renderElement(component, props = {}) {
    if (this.options.static) {
      return ReactDOMServer.renderToStaticMarkup(component, props);
    } else {
      return ReactDOMServer.renderToString(component, props);
    }
  }
}

module.exports = BeidouView;
