const beautifyHTML = require('js-beautify').html;

module.exports = view => next => function* (args) {
  yield next(args);

  if (view.config.beautify) {
    const { html } = args;
    args.html = beautifyHTML(html);
  }
};
