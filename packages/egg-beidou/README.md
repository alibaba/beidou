# egg-beidou

[Support React SSR in Egg Framework]

neet to open the plugin for using

## Feature

### extends

- ctx.render(filepath,props) Render the `filepath` by proprs and set the result as `ctx.body` value
- ctx.renderView(filepath,props) Render the `filepath` by proprs and return result for SSR

## Configure

```js
exports.beidou = {
  enable: true,
  package: 'egg-beidou',
};

// config.default.js
exports.beidou = {
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
  await ctx.render('simple/index.js', {
    data: {
      text: 'hello world!',
    },
  });
};

// if you need pass server data to render
exports.simple = async function(ctx) {
  ctx.body = await ctx.renderView('simple/index.js', {
    data: {
      text: 'hello world!',
    },
  });
};
```
