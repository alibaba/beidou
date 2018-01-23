'use strict';

const React = require('react');

module.exports = view => next =>
  async function (args) {
    const { Component, props } = args;
    const instance = React.createElement(Component, props);
    args.html += view.renderToStaticMarkup(instance);
    await next(args);
  };
