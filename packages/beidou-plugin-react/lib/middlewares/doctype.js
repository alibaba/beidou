'use strict';

module.exports = view => next =>
  function* (args) {
    yield next(args);

    const defaultDoctype = view.config.doctype;
    const { html, Component } = args;
    const doctype = Component.doctype || defaultDoctype;
    if (doctype && typeof doctype === 'string') {
      args.html = doctype + html;
    }
  };
