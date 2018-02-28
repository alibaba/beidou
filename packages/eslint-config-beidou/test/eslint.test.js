'use strict';

const assert = require('assert');
const eslintrc = require('../index');

describe('eslint', () => {
  it('should get rules', () => {
    assert.ok(eslintrc);
    // assert.deepEqual(eslintrc.parser, 'espree');
    // assert.deepEqual(eslintrc.parserOptions.ecmaFeatures, {
    //   jsx: true,
    // });
  });
});
