'use strict';

module.exports.fast = function* () {
  console.error('fast', window.location.href);
  this.body = window.location.href;
};

module.exports.slow = function* () {
  console.error('slow', window.location.href);
  yield new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  console.error('slow', window.location.href);
  this.body = window.location.href;
};

