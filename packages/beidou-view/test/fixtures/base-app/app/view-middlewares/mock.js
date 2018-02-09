'use strict';

module.exports = async function (viewCtx, next) {
  await next();

  viewCtx.html = 'mock data';
};
