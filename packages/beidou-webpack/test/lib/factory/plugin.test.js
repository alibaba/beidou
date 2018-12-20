'use strict';

const assert = require('assert');
const Plugin = require('../../../lib/factory/plugin');
describe('test/lib/factory/plugin.test.js', () => {
  it('init plugin error', () => {
    assert.throws(
      function () {
        new Plugin()
      },
      Error
    );
  })
})
