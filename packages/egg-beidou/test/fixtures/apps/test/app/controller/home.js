const path = require('path');
exports.index = async function(ctx) {
  ctx.app.config.beidou.stream = true;
  ctx.app.config.beidou.static = false;
  ctx.body = await ctx.ssr('/simple/index.js');
};

exports.miss = async function(ctx) {
  ctx.app.config.beidou.stream = true;
  ctx.body = await ctx.ssr('miss/index.js');
};

exports.ssr = async function(ctx) {
  ctx.app.config.beidou.stream = true;
  ctx.app.config.beidou.static = false;
  ctx.body = await ctx.ssr(path.join(ctx.app.baseDir, '../../../', '/build/simple/index.js'));
};

exports.suffix = async function(ctx) {
  ctx.app.config.beidou.stream = true;
  ctx.app.config.beidou.static = false;
  ctx.body = await ctx.ssr('/simple/index');
};

exports.suffixpath = async function(ctx) {
  ctx.app.config.beidou.stream = true;
  ctx.app.config.beidou.static = false;
  ctx.body = await ctx.ssr(path.join(ctx.app.baseDir, '../../../', '/build/simple/index.js'));
};

