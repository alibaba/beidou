'use strict';

exports.index = async function (ctx) {
  ctx.app.config.beidou.static = true;
  ctx.body = await ctx.renderView('spa/index.js', { ctx });
};
