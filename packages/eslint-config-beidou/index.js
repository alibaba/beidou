'use strict';

module.exports = {
  extends: ['eslint-config-ali/react'].map(require.resolve),
  parser: 'babel-eslint',
  env: {
    mocha: true,
    browser: true,
    node: true,
    commonjs: true,
  },
  rules: {
    strict: 'off',
  },
  globals: {
    __ENV__: true,
    __CLIENT__: true,
    __SERVER__: true,
    __DEV__: true,
  },
};
