'use strict';

exports.index = async function (ctx) {
  ctx.app.beidou.options.static = false;
  ctx.body = await ctx.beidou('simple/index.js');
};

exports.miss = async function (ctx) {
  ctx.body = await ctx.beidou('miss/index.js');
};
