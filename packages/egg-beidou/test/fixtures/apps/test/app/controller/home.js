'use strict';

exports.index = async function (ctx) {
  ctx.app.config.beidou.stream = true;
  ctx.app.config.beidou.static = false;
  ctx.body = await ctx.renderView('simple/index.js');
};

exports.miss = async function (ctx) {
  ctx.app.config.beidou.stream = true;
  ctx.body = await ctx.renderView('miss/index.js');
};
