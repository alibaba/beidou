module.exports = view => next => function* (args) {
  yield next(args);

  const defautDoctype = view.config.doctype;
  const { html, Component } = args;
  const doctype = Component.doctype || defautDoctype;
  if (doctype && typeof doctype === 'string') {
    args.html = doctype + html;
  }
};
