'use strict';

/**
 * @param {Number} time - sleep time in seconds
 */
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time * 1000);
  });
}

exports.sleep = sleep;
