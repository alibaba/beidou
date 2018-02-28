'use strict';

const assert = require('assert');
const babelConfig = require('../index');

describe('babel-preset-client', () => {
  it('should exist', () => {
    assert(typeof babelConfig === 'object');
    assert(Array.isArray(babelConfig.presets));
  });
});
