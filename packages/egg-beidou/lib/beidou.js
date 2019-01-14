'use strict';

const ReactDOMServer = require('react-dom/server');
const React = require('react');
const fs = require('fs');
const through = require('through');
const path = require('path');
const compose = require('koa-compose');

class Beidou {
  constructor(app) {
    this.app = app;
    this.config = this.app.config;
    this.options = this.config.beidou;
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
    this.fn = compose(
      this.config.beidou.middlewares.map(name => middlewares[name])
    );
  }

  async render(ctx, filepath, props) {
    const filePaths = [
      path.join(filepath),
      path.join(this.options.viewPath, filepath),
    ];
    const resolvePath = filePaths.find(p =>
      fs.existsSync(typeof p === 'function' ? p() : p)
    );

    if (!resolvePath) {
      this.app.logger.error(`require file path error , ${filepath}`);
      throw new Error(`require file path error , ${filepath}`);
    }

    const indexBundle = require(resolvePath);
    const Component = indexBundle.__esModule
      ? indexBundle.default
      : indexBundle;
    props = Object.assign(
      {
        ctx,
        html: '',
      },
      props
    );
    await this.fn({
      props,
      view: this,
      Component,
    });
    // console.log('props ',props);
    const component = React.createElement(Component, props);
    let html = '';
    if (this.options.stream) {
      html = through();
      process.nextTick(async () => {
        const renderedStream = this.renderStream(component);
        await new Promise((resolve, reject) => {
          renderedStream.pipe(
            html,
            {
              end: false,
            }
          );
          renderedStream.on('error', reject);
          renderedStream.on('end', resolve);
        });
        html.end();
      });
    } else {
      html = this.renderString(component);
    }

    return html;
  }

  renderStream(component, props = {}) {
    if (this.options.static) {
      return ReactDOMServer.renderToStaticNodeStream(component, props);
    } else {
      return ReactDOMServer.renderToNodeStream(component, props);
    }
  }

  renderString(component, props) {
    if (this.options.static) {
      return ReactDOMServer.renderToStaticMarkup(component, props);
    } else {
      return ReactDOMServer.renderToString(component, props);
    }
  }
}

module.exports = Beidou;
