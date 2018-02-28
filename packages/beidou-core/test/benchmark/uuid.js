'use strict';

/**
 * Module dependencies.
 */

const nodeuuid = require('node-uuid');
const crypto = require('crypto');
const Benchmark = require('benchmark');
const uuidjs = require('uuid-js');
const uuid = require('uuid');

const suite = new Benchmark.Suite();

console.log('uuidjs.v4(): %s', uuidjs.create(4).toString());
console.log('uuidjs.v1(): %s', uuidjs.create(1).toString());
console.log('nodeuuid.v4(): %s', nodeuuid.v4());
console.log('nodeuuid.v1(): %s', nodeuuid.v1());
console.log('uuid.v4(): %s', uuid.v4());
console.log('uuid.v1(): %s', uuid.v1());
console.log(
  "crypto.randomBytes(16).toString('hex'): %s",
  crypto.randomBytes(16).toString('hex')
);

// add tests
suite
  .add('uuidjs.v4()', () => {
    uuidjs.create(4).toString();
  })
  .add('uuidjs.v1()', () => {
    uuidjs.create(1).toString();
  })

  .add('uuid.v4()', () => {
    uuid.v4();
  })
  .add('uuid.v1()', () => {
    uuid.v1();
  })

  .add('nodeuuid.v4()', () => {
    nodeuuid.v4();
  })
  .add('nodeuuid.v1()', () => {
    nodeuuid.v1();
  })

  .add('crypto.randomBytes(16)', () => {
    crypto.randomBytes(16).toString('hex');
  })
  // add listeners
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  // run async
  .run({ async: true });

// $ node test/benchmark/uuid.js
// uuidjs.v4(): e6beaa9a-eb93-4c3c-86c5-65c0a9e5c583
// uuidjs.v1(): 851a7c17-3252-11e4-ac34-abdc860036bb
// nodeuuid.v4(): b90cd6fa-d6f3-4f0f-a987-3078226c0c3b
// nodeuuid.v1(): 851aca30-3252-11e4-8863-1dcfc229f060
// uuid.v4(): 87bcaf4c-6c8c-4f87-9546-99d7419c582b
// uuid.v1(): 851b1850-3252-11e4-bb3e-7728687c1d33
// crypto.randomBytes(16).toString('hex'): d14cb29a99ee2f7c02b0ce2ee9655fff
// uuidjs.v4() x 549,265 ops/sec ±0.86% (95 runs sampled)
// uuidjs.v1() x 439,728 ops/sec ±2.21% (87 runs sampled)
// uuid.v4() x 362,758 ops/sec ±1.31% (89 runs sampled)
// uuid.v1() x 1,042,014 ops/sec ±2.25% (86 runs sampled)
// nodeuuid.v4() x 355,843 ops/sec ±2.96% (82 runs sampled)
// nodeuuid.v1() x 1,058,848 ops/sec ±3.09% (87 runs sampled)
// crypto.randomBytes(16) x 379,755 ops/sec ±3.11% (83 runs sampled)
// Fastest is nodeuuid.v1(),uuid.v1()
