'use strict';

const assert = require('assert');
const utils = require('../lib/utils');
const BaseView = require('../index');

describe('test/view.test.js', () => {
  it('utils', () => {
    const { concatUrl } = utils;
    assert(concatUrl('http://beidou.net', 'docs', 'quickstart') === 'http://beidou.net/docs/quickstart');
    assert(concatUrl('/root/', '/docs/', '/quickstart/') === '/root/docs/quickstart/');
  });

  it('base view', () => {
    assert(BaseView);
  });
});
