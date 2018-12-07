'use strict';

const ReactDOM = require('react-dom/server');
const through = require('through');
const BaseView = require('beidou-view');
const createRender = require('./render');

const {
  renderToString,
  renderToStaticMarkup,
  renderToNodeStream,
  renderToStaticNodeStream,
} = ReactDOM;

module.exports = class ReactView extends BaseView {
  constructor(ctx) {
    super(ctx, ctx.app.config.react);
  }

  renderElement(...args) {
    return this.options.static
      ? renderToStaticMarkup(...args)
      : renderToString(...args);
  }

  renderElementToStream(...args) {
    return this.options.static
      ? renderToStaticNodeStream(...args)
      : renderToNodeStream(...args);
  }

  async render(filepath, props) {
    const components = [];
    const { placeHolder } = this.options;
    const Render = createRender(components, placeHolder, this.renderElement);
    Object.assign(props, {
      Render,
    });
    const htmlStr = await super.render(filepath, props);

    if (components.length) {
      const res = through();
      process.nextTick(async () => {
        try {
          const parts = htmlStr.split(placeHolder);
          for (let i = 0; i < parts.length - 1; i += 1) {
            const part = parts[i];
            res.write(part);

            const { stream, component } = components[i];

            if (stream) {
              const renderedStream = this.renderElementToStream(component);

              // eslint-disable-next-line
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
            } else {
              const partHtml = this.renderElement(component);
              res.write(partHtml);
            }
          }
          res.write(parts[parts.length - 1]);
          res.end();
        } catch (e) {
          res.end();
          throw e;
        }
      });
      this.ctx.type = 'html';
      return res;
    }
    return htmlStr;
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
