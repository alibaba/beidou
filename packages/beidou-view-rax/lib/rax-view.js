'use strict';

const BaseView = require('beidou-view');
const { renderToString } = require('rax-server-renderer');

module.exports = class RaxView extends BaseView {
  constructor(ctx) {
    super(ctx, ctx.app.config.rax);
  }

  renderElement(...args) {
    return renderToString(...args);
  }

  async render(filepath, props) {
    Object.assign(props, {
      renderElement: this.renderElement.bind(this),
    });
    return super.render(filepath, props);
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
