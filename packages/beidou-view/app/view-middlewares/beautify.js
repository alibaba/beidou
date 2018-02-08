'use strict';

const beautifyHTML = require('js-beautify').html;

module.exports = async function (viewCtx, next) {
  await next();

  if (viewCtx.options.beautify) {
    const { html } = viewCtx;
    viewCtx.html = beautifyHTML(html);
  }
};
