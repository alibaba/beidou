'use strict';

const is = require('is-type-of');

module.exports = async function (viewCtx, next) {
  const { Component, props, view } = viewCtx;
  const { logger } = props.ctx;

  // check static method in Component
  const render = Component.getPartial;
  if (typeof render === 'function') {
    let mapping = is.asyncFunction(render)
      ? await render(props)
      : render(props);

    if (is.promise(mapping)) {
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
          result.push(view.renderElement(app));
        }
        props[key] = result;
      } else {
        props[key] = view.renderElement(mapping[key]);
      }
    }
  }

  await next();
};
