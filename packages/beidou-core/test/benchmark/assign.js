'use strict';

const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const utils = require('../../lib/util');

const suite = new Benchmark.Suite();

suite
.add('Object.assign', function() {
  const a = {};
  const b = { a: 1, b: 2, c: 3, d: 4, e: 5};
  Object.assign(a, b);
})
.add('for in', function() {
  const a = {};
  const b = { a: 1, b: 2, c: 3, d: 4, e: 5};
  for (let key in b) {
    a[key] = b[key];
  }
})
.add('Object.keys', function() {
  const a = {};
  const b = { a: 1, b: 2, c: 3, d: 4, e: 5};
  const keys = Object.keys(b);
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    a[key] = b[key];
  }
})
.add('utils.assign', function() {
  const a = {};
  const b = { a: 1, b: 2, c: 3, d: 4, e: 5};
  utils.assign(a, b);
})
.on('cycle', function (event) {
  benchmarks.add(event.target);
})
.on('start', function () {
  console.log('\n  node version: %s, date: %s\n  Starting...', process.version, Date());
})
.on('complete', function() {
  benchmarks.log();
  process.exit(0);
})
.run({ 'async': false });


// node version: v4.2.3, date: Tue Jan 26 2016 16:52:46 GMT+0800 (CST)
// Starting...
// 4 tests completed.
//
// Object.assign x   646,034 ops/sec ±1.61% (86 runs sampled)
// for in        x 2,754,639 ops/sec ±1.21% (88 runs sampled)
// Object.keys   x 3,590,226 ops/sec ±1.04% (93 runs sampled)
// utils.assign  x 3,192,343 ops/sec ±0.69% (93 runs sampled)
