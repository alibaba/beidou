# egg-beidou

[Support React SSR in Egg Framework]

neet to open the plugin for using

## Feature

### extends

- app.beidou the Beidou plugin Object
- ctx.beidou render the file for SSR

## Configure

```js
// plugin.js
exports.isomorphic = {
  enable: true,
  package: 'beidou-isomorphic',
};
exports.beidou = {
  enable: true,
  package: 'egg-beidou',
};

// config.default.js
exports.beidou = {
  viewPath: '', // render the base path
  static: true, //  whether use static render for SSR
  stream: false, //  whether use stream render for SSR
};
```

## Example

> see more example to test/exmaple folder

```js
// Controller
'use strict';

exports.index = async function(ctx) {
  ctx.body = await ctx.beidou('simple/index.js');
};

// if you need pass server data to render
exports.simple = async function(ctx) {
  ctx.body = await ctx.beidou('simple/index.js', {
    data: {
      msg: 'your data',
    },
    ctx,
  });
};
```
