'use strict';

const assert = require('assert');
const babelConfig = require('../index');

describe('babel-preset-client', function() {

  it('should exist', function() {
    assert(typeof babelConfig === 'object');
    assert(Array.isArray(babelConfig.presets));
    assert(Array.isArray(babelConfig.plugins));
  });
});
