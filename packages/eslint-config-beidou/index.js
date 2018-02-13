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
  parserOptions: {
    ecmaVersion: 9,
    ecmaFeatures: {
      impliedStrict: false,
      modules: false,
    },
  },
  rules: {
    'new-cap': 'off',
    'require-yield': 'off',
    'import/no-dynamic-require': 'off',
    strict: 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
  },
  globals: {
    __ENV__: true,
    __CLIENT__: true,
    __SERVER__: true,
    __DEV__: true,
  },
};
