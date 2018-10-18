'use strict';

const assert = require('assert');
const preset = require('../index');

const mockApi = {
  assertVersion: ()=>{},
}

describe('babel-preset-client', () => {
  it('should exist', () => {
    assert(typeof preset === 'function');
    const result = preset(mockApi);
    assert(Array.isArray(result.presets));
  });
});
