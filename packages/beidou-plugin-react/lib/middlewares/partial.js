'use strict';

const utils = require('../utils');

module.exports = view => next =>
  async function (args) {
    const { Component, props } = args;
    const { logger } = props.ctx;

    // check static method in Component
    const render = Component.getPartial;
    if (typeof render === 'function') {
      let mapping = utils.isAsyncFunc(render)
        ? await render(props)
        : render(props);

      if (utils.isPromise(mapping)) {
        mapping = await mapping;
      }

      for (const key in mapping) {
        if (key in props) {
          logger.warn(
            '[plugin:react:partial] `%s` already exists in props, origin value will be overwritten',
            key
          );
        }
        if (Array.isArray(mapping[key])) {
          const result = [];
          for (const app of mapping[key]) {
            result.push(view.renderReact(app));
          }
          props[key] = result;
        } else {
          props[key] = view.renderReact(mapping[key]);
        }
      }
    }

    await next(args);
  };
