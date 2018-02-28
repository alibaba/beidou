'use strict';

module.exports.fast = async function () {
  console.error('fast', window.location.href);
  this.body = window.location.href;
};

module.exports.slow = async function () {
  console.error('slow', window.location.href);
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  console.error('slow', window.location.href);
  this.body = window.location.href;
};
