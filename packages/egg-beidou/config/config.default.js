'use strict';

exports.beidou = {
  middlewares: [
    'custom',
    'cache',
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
  static: true,
  stream: false,
  view: false,
};
