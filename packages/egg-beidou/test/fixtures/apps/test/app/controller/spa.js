'use strict';

exports.index = async function (ctx) {
  ctx.app.beidou.options.stream = true;
  ctx.body = await ctx.beidou('spa/index.js', { ctx });
};
