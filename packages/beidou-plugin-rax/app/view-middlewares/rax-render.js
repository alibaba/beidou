'use strict';

const Rax = require('rax');
const RaxServer = require('rax-server-renderer');

module.exports = async function (viewCtx, next) {
  const { Component, props } = viewCtx;

  const instance = Rax.createElement(Component, props);
  viewCtx.html += RaxServer.renderToString(instance);
  await next();
};
