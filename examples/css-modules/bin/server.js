'use strict'; // eslint-disable-line
const path = require('path');

const beidou = require('beidou-core');

beidou.startCluster({
  port: 6001,
  baseDir: path.join(__dirname, '..'),
  workers: 1
});
