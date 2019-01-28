'use strict';

exports.index = async function (ctx) {
  ctx.body = await ctx.renderView('redux/index.js', { ctx });
};

exports.page = async function (ctx) {
  ctx.app.config.beidou.stream = false;
  ctx.body = await ctx.renderView('redux/page.js', { ctx });
};
