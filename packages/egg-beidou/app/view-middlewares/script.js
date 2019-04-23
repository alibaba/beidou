'use strict';

const is = require('is-type-of');

module.exports = async function(viewCtx, next) {
  const { Component, props } = viewCtx;

  const render = Component.script;
  if (typeof render === 'function') {
    const result = is.asyncFunction(render)
      ? await render(props)
      : render(props);
    props.script = result;
  }
  await next();
};
