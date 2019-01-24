'use strict';

const ReactDOMServer = require('react-dom/server');
const React = require('react');
const fs = require('fs');
const through = require('through');
const path = require('path');
const compose = require('koa-compose');

class BeidouView {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
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

    // 加载 beidou-view 中间件
    new FileLoader({
      directory: path.join(
        require.resolve('beidou-view'),
        '../app/view-middlewares'
      ),
      target: middlewares,
      call: false,
    }).load();

    this.fn = compose(this.options.middlewares.map(name => middlewares[name]));
  }

  async render(filepath, props = {}) {
    const filePaths = [
      path.resolve(filepath),
      path.join(this.options.viewPath, filepath),
    ];
    const resolvePath = filePaths.find(p => fs.existsSync(p));

    if (!resolvePath) {
      this.app.logger.error(`require file path error , ${filepath}`);
      throw new Error(`require file path error , ${filepath}`);
    }
    const indexBundle = require(resolvePath);
    const Component = indexBundle.__esModule
      ? indexBundle.default
      : indexBundle;

    Object.assign(
      props,
      {
        renderElement: this.renderElement.bind(this),
        renderElementToStream: this.renderElementToStream.bind(this),
      },
      { ctx: this.ctx }
    );

    const context = {
      filepath,
      Component: Component.default || Component,
      props,
      html: '',
      view: this,
      config: this.config,
      options: this.options,
    };

    await this.fn(context);
    const htmlStr = context.html;
    const component = React.createElement(context.Component, props);
    let res = '';
    if (this.options.stream) {
      res = through();
      process.nextTick(async () => {
        const renderedStream = this.renderElementToStream(component);
        await new Promise((resolve, reject) => {
          renderedStream.pipe(
            res,
            {
              end: false,
            }
          );
          renderedStream.on('error', reject);
          renderedStream.on('end', resolve);
        });
        res.write(htmlStr);
        res.end();
      });
    } else {
      res = this.renderElement(component);
      res += htmlStr;
    }

    return res;
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
