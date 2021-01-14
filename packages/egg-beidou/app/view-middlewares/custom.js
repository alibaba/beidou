'use strict';

const is = require('is-type-of');

module.exports = async function (viewCtx, next) {
  const { Component, props } = viewCtx;

  const render = Component.custom;
  if (typeof render === 'function') {
    is.asyncFunction(render)
      ? await render.call(Component, props)
      : render.call(Component, props);
  }
  await next();
};
