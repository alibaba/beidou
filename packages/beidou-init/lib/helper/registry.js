'use strict';

const checkRegistry = require('check-npm-registry');

// all available registries
const available = [
  'https://registry.npmjs.org/',
  'http://r.cnpmjs.org/',
  'https://registry.npm.taobao.org/',
  'https://registry.nodejitsu.com/',
  'http://registry.mirror.cqupt.edu.cn',
  'https://skimdb.npmjs.com/registry',
];

let lastCheckedRegistry = null;

module.exports = function () {
  return new Promise((resolve) => {
    if (lastCheckedRegistry) {
      resolve(lastCheckedRegistry);
      return;
    }
    checkRegistry(available).then((registry) => {
      lastCheckedRegistry = registry;
      resolve(registry);
    });
  });
};
