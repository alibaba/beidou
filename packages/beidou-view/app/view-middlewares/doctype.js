'use strict';

module.exports = async function (viewCtx, next) {
  await next();

  const defaultDoctype = viewCtx.options.doctype;
  const { html, Component } = viewCtx;
  const doctype = Component.doctype || defaultDoctype;
  if (doctype && typeof doctype === 'string') {
    viewCtx.html = doctype + html;
  }
};
