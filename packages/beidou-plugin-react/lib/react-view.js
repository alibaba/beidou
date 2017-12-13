'use strict';

const React = require('react');
const compose = require('./utils').compose;
const reduxMiddleware = require('./middlewares/redux');
const partialMiddleware = require('./middlewares/partial');
// const renderMiddleware = require('./middlewares/render');
const cacheMiddleware = require('./middlewares/cache');
const beautifyMiddleware = require('./middlewares/beautify');
const doctypeMiddleware = require('./middlewares/doctype');

const symbol = Symbol.for('ReactView#view');

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

    const middlewares = [cacheMiddleware, reduxMiddleware, partialMiddleware, doctypeMiddleware, beautifyMiddleware];

    const chain = middlewares.map(middleware => middleware(this));

    const renderToStaticMarkup = this.renderToStaticMarkup;
    this.renderWithMiddlewares = compose(...chain)(function* (args) { // eslint-disable-line
      const { Component, props } = args;
      const instance = React.createElement(Component, props);
      args.html = renderToStaticMarkup(instance);
    });
  }


  render(filepath, props) {
    Object.assign(props, {
      render: this.renderReact,
      renderToString: this.renderToString,
      renderToStaticMarkup: this.renderToStaticMarkup,
      appHelper: props.helper, // backwark compatibility
    });
    const process = this.renderWithMiddlewares;
    const Component = require(filepath);
    return function* () {
      const payload = {
        filepath,
        Component: Component.default || Component, // when add-module-exports not work
        props,
        html: '',
      };

      yield process(payload);

      return payload.html;
    };
  }

  /**
   * render file in view directories: `app/views` or `client`
   * @param {*} viewPath full path of view file
   * @param {*} locals variables will be passed into render function as react component props
   */
  renderFile(viewPath, locals) {
    return new Promise((resolve, reject) => {
      let markup = '';
      const doctype = '';
      try {
        const exportObj = require(viewPath);
        const Component = exportObj.default || exportObj;
        let layout = doctype;

        // server render pure component
        if (this.isReactComponent(Component)) {
          layout += this.renderReactComponent(Component, locals);
        }

        // server render component with server context injected
        if (this.isReactConstructor(Component)) {
          layout += this.renderReactConstructor(Component, locals);
        }

        // isomorphic render
        if (this.isReactView(Component)) {
          layout += this.renderCustomView(Component, locals);
        }

        markup = layout;
      } catch (err) {
        this.app.logger.error(err);
        err.name = `no such file or directory: ${viewPath}`;
        err.status = 404;
        return reject(err);
      }

      return resolve(markup);
    });
  }

  renderString() {
    const self = this;
    return new Promise((resolve, reject) => {
      self.app.logger.info('reject');
      const err = new Error();
      err.name = 'not implemented yet!';
      err.status = 200;
      reject(err);
    });
  }

  renderReactComponent(component) {
    return this.renderReact(component);
  }

  renderReactConstructor(Component, locals) {
    return this.renderToStaticMarkup(React.createElement(Component, locals));
  }

  renderCustomView(View, locals) {
    let content = '';
    if (View[symbol]) {
      const viewConfig = View[symbol];
      content += this.renderToStaticMarkup(React.createElement(View, locals));
      viewConfig.containerIds.forEach((containerId, index) => {
        const match = content.match(new RegExp(`id="${containerId}"[^>]*>`));
        if (match && match[0]) {
          const renderdString = this.renderReact(viewConfig.elements[index]);
          if (this.config.beautify) {
            // renderdString = beautifyHTML(renderdString);
          }
          const holder = match.index + match[0].length;
          content = content.substr(0, holder)
                      + renderdString
                      + content.substr(holder);
        }
      });
    }
    return content;
  }

  isReactComponent(component) {
    return React.isValidElement(component);
  }

  isReactConstructor(Component) {
    return typeof Component === 'function' && !Component[symbol];
  }

  isReactView(Component) {
    return typeof Component === 'function' && Component[symbol];
  }
}

module.exports = BeidouReactView;
