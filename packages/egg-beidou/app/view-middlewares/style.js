'use strict';

const is = require('is-type-of');

module.exports = async function (viewCtx, next) {
  const { Component, props } = viewCtx;

  const style = Component.style;
  if (typeof style === 'function') {
    const result = is.asyncFunction(style) ? await style(props) : style(props);
    if (result) {
      props.style = result;
    }
  }
  await next();
};
