'use strict';

const ReactDOM = require('react-dom/server');
const BaseView = require('beidou-view');

const { renderToString, renderToStaticMarkup } = ReactDOM;

module.exports = class ReactView extends BaseView {
  constructor(ctx) {
    super(ctx, ctx.app.config.react);
  }

  renderElement(...args) {
    return this.options.static
      ? renderToStaticMarkup(...args)
      : renderToString(...args);
  }

  async render(filepath, props) {
    Object.assign(props, {
      renderElement: this.renderElement.bind(this),
    });
    return await super.render(filepath, props);
  }

  async renderString() {
    return new Promise((resolve, reject) => {
      this.app.logger.info('reject');
      const err = new Error();
      err.name = 'not implemented yet!';
      err.status = 200;
      reject(err);
    });
  }
};
