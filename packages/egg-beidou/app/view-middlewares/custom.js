'use strict';

const is = require('is-type-of');

module.exports = async function (viewCtx, next) {
  const { Component, props } = viewCtx;

  const custom = Component.custom;
  if (typeof custom === 'function') {
    is.asyncFunction(custom)
      ? await custom.call(Component, props)
      : custom.call(Component, props);
  }
  await next();
};
