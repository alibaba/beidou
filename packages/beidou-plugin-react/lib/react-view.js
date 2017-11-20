'use strict';

const serialize = require('serialize-javascript');
const helper = require('./helper');
const beautifyHTML = require('js-beautify').html;
const React = require('react');

const Helper = Symbol('ReactView#Helper');
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
    this._config = ctx.app.config.react;
    this.extname = this._config.extname;
    this.renderToString = this.app.viewEngine.renderToString;
    this.renderToStaticMarkup = this.app.viewEngine.renderToStaticMarkup;
    this.renderReact = this._config.internals
      ? this.renderToString
      : this.renderToStaticMarkup;
  }

  render(name, locals) {
    const newLocals = Object.assign({}, locals, {
      renderToStaticMarkup: this.renderToStaticMarkup,
      renderToString: this.renderToString,
      render: this.renderReact,
    });

    if (locals.store) {
      // accept redux store instance or pure object
      const storeObject = typeof locals.store.getState === 'function' ?
        locals.store.getState() : locals.store;

      const state = serialize(storeObject, { isJSON: true });
      newLocals.state = state;
    }

    // replace egg's helper as appHelper
    newLocals.appHelper = newLocals.helper;
    // inject view helper
    newLocals.helper = this.helper;

    const viewPath = name;

    return this.renderFile(viewPath, newLocals);
  }

  /**
   * render file in view directories: `app/views` or `client`
   * @param {*} viewPath full path of view file
   * @param {*} locals variables will be passed into render function as react component props
   */
  renderFile(viewPath, locals) {
    return new Promise((resolve, reject) => {
      const doctype = this._config.doctype || /* istanbul ignore next */ '';
      let markup = '';

      try {
        // clean cache
        if (!this._config.cache) {
          Object.keys(require.cache).forEach((module) => {
            if (new RegExp(viewPath).test(require.cache[module].filename)) {
              delete require.cache[module];
            }
          });
        }
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
          let renderdString = this.renderReact(viewConfig.elements[index]);
          if (this._config.beautify) {
            renderdString = beautifyHTML(renderdString);
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

  get helper() {
    if (!this[Helper]) {
      this[Helper] = helper(this.ctx.app);
    }
    return new this[Helper](this.ctx);
  }
}

module.exports = BeidouReactView;
