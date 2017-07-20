'use strict';

const utils = require('../utils');
const app = utils.createMockApp('apps/alipay-demo');

const num = 500000;

let start = Date.now();
for (let i = 0; i < num; i++) {
  const ctx = app.mockContext();
  ctx.locals = {
    a: 1,
    b: 2
  };
}

let duration = Date.now() - start;
let qps = (num / duration * 1000).toFixed(1);
console.log(`set locals ${num} times, used ${duration}, ${qps} ops/sec.`);

start = Date.now();

for (let i = 0; i < num; i++) {
  const ctx = app.mockContext();
  ctx.locals = {
    a: 1,
    b: 2
  };
  // get
  ctx.locals;
}

duration = Date.now() - start;
qps = (num / duration * 1000).toFixed(1);
console.log(`set and get locals ${num} times, used ${duration}, ${qps} ops/sec.`);

process.exit(0);
