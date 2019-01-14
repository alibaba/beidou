'use strict';

const is = require('is-type-of');

module.exports = async function (viewCtx, next) {
  const { Component, props } = viewCtx;

  const script = Component.script;
  if (typeof script === 'function') {
    const result = is.asyncFunction(script)
      ? await script(props)
      : script(props);
    if (result) {
      props.script = result;
    }
  }
  await next();
};
