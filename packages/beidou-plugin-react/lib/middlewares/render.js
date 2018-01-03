const React = require('react');

module.exports = view => next =>
  function* (args) {
    const { Component, props } = args;
    const instance = React.createElement(Component, props);
    args.html += view.renderToStaticMarkup(instance);
    yield next(args);
  };
