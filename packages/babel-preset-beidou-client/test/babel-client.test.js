'use strict';

const assert = require('assert');
const preset = require('../index');

const mockApi = {
  assertVersion: ()=>{},
  env: () => false
}

describe('babel-preset-client', () => {
  it('should exist', () => {
    assert(typeof preset === 'function');
    const result = preset(mockApi, {});
    assert(Array.isArray(result.presets));
  });

  it('should enable typescript', () => {
    assert(typeof preset === 'function');
    const result = preset(mockApi, { typescript: true });
    assert(Array.isArray(result.presets));
    assert.equal(result.presets.length, 3)
  });


  it('should enable typescript with options', () => {
    assert(typeof preset === 'function');
    const result = preset(mockApi, { typescript: {
      isJsx: true
    } });
    assert(Array.isArray(result.presets));
    assert.equal(typeof result.presets[1][1], 'object');
  });

  it('should overrite defalt env config', () => {
    assert(typeof preset === 'function');
    const result = preset(mockApi, { env: {
      corejs: '2.0.0',
    } });
    assert(Array.isArray(result.presets));
    assert.equal(typeof result.presets[0][1], 'object');
    assert.equal(result.presets[0][1].corejs, '2.0.0');
  });

});
