'use strict';

module.exports = async function (ctx, next) {
  const { name } = ctx.request.body;

  if (!name) {
    ctx.status = 404;
    return
  }

  ctx.status = 200;
  ctx.body = 'ok';
};
