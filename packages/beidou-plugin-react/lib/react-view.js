'use strict';

const React = require('react');
const compose = require('./utils').compose;
const reduxMiddleware = require('./middlewares/redux');
const partialMiddleware = require('./middlewares/partial');
// const renderMiddleware = require('./middlewares/render');
const cacheMiddleware = require('./middlewares/cache');
const beautifyMiddleware = require('./middlewares/beautify');
const doctypeMiddleware = require('./middlewares/doctype');

class BeidouReactView {
  /*
    beautify: false // optional, beautify HTML snippet
    cache: true, //optional, if false, clean require cache for development usage
    internals: true, //optional, true: renderToString or false: renderToStaticMarkup
    doctype: '<!DOCTYPE html>', //optional, HTML doctype
  */
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.config = ctx.app.config.react;
    this.renderToString = this.app.viewEngine.renderToString;
    this.renderToStaticMarkup = this.app.viewEngine.renderToStaticMarkup;
    this.renderReact = this.config.static
      ? this.renderToStaticMarkup
      : this.renderToString;

    const middlewares = [
      cacheMiddleware,
      reduxMiddleware,
      partialMiddleware,
      doctypeMiddleware,
      beautifyMiddleware,
    ];

    const chain = middlewares.map(middleware => middleware(this));

    const renderToStaticMarkup = this.renderToStaticMarkup;
    this.renderWithMiddlewares = compose(...chain)(async (args) => {
      // eslint-disable-line
      const { Component, props } = args;
      const instance = React.createElement(Component, props);
      args.html = renderToStaticMarkup(instance);
    });
  }

  async render(filepath, props) {
    Object.assign(props, {
      render: this.renderReact,
      renderToString: this.renderToString,
      renderToStaticMarkup: this.renderToStaticMarkup,
      appHelper: props.helper, // backward compatibility
    });
    const process = this.renderWithMiddlewares;
    const Component = require(filepath);
    const payload = {
      filepath,
      Component: Component.default || Component, // when add-module-exports not work
      props,
      html: '',
    };

    await process(payload);
    const htmlStr = payload.html;

    const { ctx } = this;
    ctx.body = htmlStr;

    return htmlStr;
  }

  async renderString() {
    const self = this;
    return new Promise((resolve, reject) => {
      self.app.logger.info('reject');
      const err = new Error();
      err.name = 'not implemented yet!';
      err.status = 200;
      reject(err);
    });
  }
}

module.exports = BeidouReactView;
