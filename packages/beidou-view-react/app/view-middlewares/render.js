'use strict';

const React = require('react');
const ReactDOM = require('react-dom/server');

module.exports = async function (viewCtx, next) {
  const { Component, props } = viewCtx;

  const instance = React.createElement(Component, props);
  viewCtx.html += ReactDOM.renderToStaticMarkup(instance);
  await next();
};
