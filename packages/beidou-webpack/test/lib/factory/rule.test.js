'use strict';

const assert = require('assert');
const Rule = require('../../../lib/factory/rule');
describe('test/lib/factory/rule.test.js', () => {
  it('init rule error', () => {
    assert.throws(
      function () {
        new Rule()
      },
      Error
    );
  })

  it('init rule error', () => {
    const ruleObj = new Rule({
      test:'js'
    })
    assert(ruleObj,'init rule error');
    assert(ruleObj.init().test === 'js','get rule options error')
  })
})
