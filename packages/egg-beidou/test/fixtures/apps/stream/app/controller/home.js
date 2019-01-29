'use strict';

exports.index = async function (ctx) {
  ctx.body = await ctx.renderView('simple/index.js');
};

exports.miss = async function (ctx) {
  ctx.body = await ctx.renderString('simple/index.js');
};
