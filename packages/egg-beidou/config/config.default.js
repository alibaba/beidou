'use strict';
module.exports = () => ({
  beidou: {
    middlewares: [
      'render',
      'custom',
      'initialprops',
      'redux',
      'partial',
      'beautify',
      'doctype',
      'script',
      'style',
    ],
    doctype: '<!DOCTYPE html>',
    cache: true,
    static: false,
    stream: false,
    extensions: [ '.js', 'jsx', '.ts', '.tsx' ],
  },
});
