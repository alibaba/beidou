'use strict';

const assert = require('assert');
const babelConfig = require('../index');

describe('babel-preset-server', () => {
  it('should exist', () => {
    assert(typeof babelConfig === 'object');
    assert(Array.isArray(babelConfig.presets));
  });
});
